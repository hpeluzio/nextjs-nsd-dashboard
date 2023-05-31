'use client';

// export const metadata = {
//   title: 'Notifications',
// };

import type { RootState } from '@/app/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '@/app/redux/counterSlice';

// import './globals.css';

export default function Notifications() {
  const { value } = useSelector((state: RootState) => state.counter);
  const { theme, navbar } = useSelector((state: RootState) => state.layout);

  const dispatch = useDispatch();

  return (
    <main>
      <div>
        {theme} - {navbar ? 'True' : 'False'}
      </div>
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
