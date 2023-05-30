'use-client';

import { LogoutIcon } from '../icons';

export default function LogoutNavItem() {
  return (
    <li
      className="hover:bg-gray-100 flex items-center h-10 w-44 dark:text-gray-200 p-5 cursor-pointer"
      // onClick={() => {
      //   console.log('Logout');
      // }}
    >
      <div className="flex justify-center items-center w-full h-20">
        {LogoutIcon} <span className="ml-2">Logout</span>
      </div>
    </li>
  );
}
