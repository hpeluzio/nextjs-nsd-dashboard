'use client';

import type { RootState } from '@/app/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '@/app/redux/counterSlice';

export default function Notifications() {
  const { value } = useSelector((state: RootState) => state.counter);

  const dispatch = useDispatch();

  return (
    <main>
      <div className="flex flex-col items-center">
        <button className="border-2 border-x-cyan-950 p-2" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{value}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementByAmount(2))}>Increment by 2</button>
      </div>
    </main>
  );
}
