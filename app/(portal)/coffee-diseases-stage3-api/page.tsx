'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { getCoffeeDiseasesPredictionsStage3 } from '@/app/redux/modelsSlice';

export default function CoffeeDiseasesApi() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [responseObject, setResponseObject] = useState({});
  const CATEGORIES = ['Cercospora', 'Phoma', 'Leaf miner / Bixo mineiro', 'Red spider mite / Ácaro vermelho'];
  const [images, setImages] = useState<File[]>([]);
  const [imageURL, setImageURL] = useState<string>('');
  const [predictions, setPredictions] = useState<any>([0, 0, 0, 0]);

  // To log the dimensions of the first image in the images state
  if (images[0]) {
    const img = document.createElement('img');

    img.onload = () => {
      console.log(`Image width: ${img.naturalWidth}px, height: ${img.naturalHeight}px`);
    };

    img.src = URL.createObjectURL(images[0]);
  }

  const onSubmit = async (values: any) => {
    setLoading(true);

    try {
      const formData: FormData = new FormData();
      if (images[0]) formData.append('files', images[0]);
      formData.append('fullname', 'values.fullname');

      const response = await dispatch(getCoffeeDiseasesPredictionsStage3(formData));
      console.log('Response: ', response);
      setResponseObject(response);

      if (response.status === 201 || response.status === 200) {
        setPredictions(response.data);
      }
    } catch (err) {
      console.log('Error: ', err);
      setLoading(false);
    }
    setLoading(false);
  };

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files);
      const newImageURLs: any[] = [];

      // Loop through the selected images and resize them to 224x224
      for (const img of selectedImages) {
        const resizedImageURL = await resizeImage(img, 1024, 1024);
        newImageURLs.push(resizedImageURL);
      }

      setImageURL(newImageURLs[0]); // Assuming you want to set the first resized image URL
    }
  };

  // Function to resize an image using a canvas
  const resizeImage = (image: File, width: number, height: number): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const img = document.createElement('img');
      img.src = URL.createObjectURL(image);

      img.onload = () => {
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedImage = new File([blob], image.name, { type: image.type });
            setImages([resizedImage]);
            resolve(URL.createObjectURL(resizedImage));
          }
        }, image.type);
      };
    });
  };

  const clear = () => {
    setImages([]);
    setImageURL('');
    setPredictions([0, 0, 0, 0]);
  };

  return (
    <div className="flex items-center flex-col w-full ">
      <h1 className="mb-5">Coffee Diseases Stage 3 API - densenet121 - 96.045% Accuracy</h1>
      <div className={`${!loading ? 'hidden' : ''}`}>Loading... please wait...</div>
      <div className={`flex flex-col items-center ${loading ? 'hidden' : ''}`}>
        <div>
          <input type="file" accept="image/*" onChange={(e) => onImageChange(e)} />

          {imageURL !== '' && <Image alt="img" src={imageURL} width="320" height="320" />}
        </div>
        <div className="flex m-5 w-full justify-around">
          <button
            className={`
          w-28 h-10 bg-neutral-400 dark:bg-neutral-600 
          hover:bg-neutral-500 dark:hover:bg-neutral-500 
          text-neutral-100 dark:text-neutral-200
          rounded
        `}
            onClick={clear}
          >
            CLEAR
          </button>

          <button
            className={`
          w-28 h-10 bg-neutral-400 dark:bg-neutral-600 
          hover:bg-neutral-500 dark:hover:bg-neutral-500 
          text-neutral-100 dark:text-neutral-200
          rounded
          ${imageURL === '' && 'opacity-50 hover:'}
        `}
            onClick={onSubmit}
            disabled={imageURL === ''}
          >
            PREDICT
          </button>
        </div>
        {imageURL !== '' ? (
          <div className="flex">
            {/* <div className="flex flex-col">
              <div className="flex justify-start mr-2">Result:</div>
              <div className="flex justify-start w-48">{result()}</div>
            </div> */}
            <div className="flex flex-col">
              {predictions
                .map((each: number, idx: number) => ({ prediction: each, class: CATEGORIES[idx] }))
                .sort((a: any, b: any) => {
                  if (a.prediction > b.prediction) return -1;
                  if (a.prediction < b.prediction) return 1;
                  if (a.prediction === b.prediction) return 0;
                })
                .map((each: any, idx: number) => (
                  <div
                    key={idx}
                    className={`
                    pt-0 pe-2 flex
                    ${idx === 0 && 'text-green-600 font-bold'}
                  `}
                  >
                    <div className="flex justify-end w-72 mr-2">{each.class}:</div>
                    <div className="flex justify-start w-20">{each.prediction}</div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div>Select a image</div>
        )}
      </div>
    </div>
  );
}
