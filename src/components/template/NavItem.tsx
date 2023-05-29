import Link from "next/link";

interface Props {
  url: string;
  text: string;
  icon: any;
}

export default function NavItem({ url, text, icon }: Props) {
  return (
    <li className="flex items-center h-10 w-44 dark:text-gray-200 mb-1 p-5 bg-green-500">
      <Link href={url}>
        <div className="flex justify-center items-center w-full h-20">
          {icon} <span className="ml-2">{text}</span>
        </div>
      </Link>
    </li>
  );
}
