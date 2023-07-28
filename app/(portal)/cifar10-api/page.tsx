'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { getPredictions } from '@/app/redux/modelsSlice';
import axios from 'axios';

export default function Cifar10() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [responseObject, setResponseObject] = useState({});
  const CATEGORIES = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'];
  const [images, setImages] = useState<File[]>([]);
  const [imageURL, setImageURL] = useState<string>('');
  const [predictions, setPredictions] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const onSubmit = async (values: any) => {
    setLoading(true);

    try {
      const formData: FormData = new FormData();
      if (images[0]) formData.append('files', images[0]);
      formData.append('fullname', 'values.fullname');

      const response = await dispatch(getPredictions(formData));

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

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);

      const newImageURLs: any[] = [];
      images.forEach((img: any) => newImageURLs.push(URL.createObjectURL(img)));
      setImageURL(URL.createObjectURL(Array.from(e.target.files)[0]));
    }
  };

  const clear = () => {
    setImages([]);
    setImageURL('');
    setPredictions([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  return (
    <div className="flex items-center flex-col w-full ">
      <h1 className="mb-5">Cifar10 API - resnet50 - 90.6400% Accuracy</h1>
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
                    <div className="flex justify-end w-20 mr-2">{each.class}:</div>
                    <div className="flex justify-start w-48">{each.prediction}</div>
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
