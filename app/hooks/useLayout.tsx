'use client';

import { useCallback, useEffect, useState } from 'react';
import { RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setNavbar } from '../redux/layoutSlice';

export default function useLayout() {
  const dispatch = useDispatch();
  const { navbar } = useSelector((state: RootState) => state.layout);
  const [width, setWidth] = useState<number>(0);

  const handleWindowSizeChange = useCallback(() => {
    setWidth(window.innerWidth);
    if (width > 700) dispatch(setNavbar(true));
    if (width <= 700) dispatch(setNavbar(false));
  }, [dispatch, width]);

  useEffect(() => {
    handleWindowSizeChange();

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  if (width > 700 && navbar === true) return 'desktop';
  if (width > 700 && navbar === false) return 'mobile';
  if (width <= 700 && navbar === true) return 'desktop';
  if (width <= 700 && navbar === false) return 'mobile';

  return 'mobile';
}
