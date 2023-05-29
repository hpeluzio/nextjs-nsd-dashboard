import Link from "next/link";

interface Props {
  url: string;
  text: string;
  icon: any;
}

export default function NavItem({ url, text, icon }: Props) {
  return (
    <Link href={url} className="bg-red-300 ">
      <li className="flex h-12 w-44 dark:text-gray-200 p-5 hover:bg-gray-100">
        <div className="flex items-center w-full">
          {icon} <span className="ml-2">{text}</span>
        </div>
      </li>
    </Link>
  );
}
