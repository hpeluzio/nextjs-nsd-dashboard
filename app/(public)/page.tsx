import Link from 'next/link';

export default function Settings() {
  return (
    <div>
      <ul>
        <Link href="/settings" className="bg-red-300 ">
          <li className="flex h-12 w-44 dark:text-gray-200 p-5 hover:bg-gray-100">
            <div className="flex items-center w-full">
              <span className="ml-2">Settings</span>
            </div>
          </li>
        </Link>
        <Link href="/notifications" className="bg-red-300 ">
          <li className="flex h-12 w-44 dark:text-gray-200 p-5 hover:bg-gray-100">
            <div className="flex items-center w-full">
              <span className="ml-2">Notifications</span>
            </div>
          </li>
        </Link>
        <Link href="/contact" className="bg-red-300 ">
          <li className="flex h-12 w-44 dark:text-gray-200 p-5 hover:bg-gray-100">
            <div className="flex items-center w-full">
              <span className="ml-2">Contact</span>
            </div>
          </li>
        </Link>
        <Link href="/about" className="bg-red-300 ">
          <li className="flex h-12 w-44 dark:text-gray-200 p-5 hover:bg-gray-100">
            <div className="flex items-center w-full">
              <span className="ml-2">About</span>
            </div>
          </li>
        </Link>
        <Link href="/login" className="bg-red-300 ">
          <li className="flex h-12 w-44 dark:text-gray-200 p-5 hover:bg-gray-100">
            <div className="flex items-center w-full">
              <span className="ml-2">Login</span>
            </div>
          </li>
        </Link>
        <Link href="/register" className="bg-red-300 ">
          <li className="flex h-12 w-44 dark:text-gray-200 p-5 hover:bg-gray-100">
            <div className="flex items-center w-full">
              <span className="ml-2">Register</span>
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );
}
