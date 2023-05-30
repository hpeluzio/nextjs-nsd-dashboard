'use-client';
interface Props {
  children?: any;
}

export default function Content({ children }: Props) {
  return (
    <div className="flex flex-col w-full p-5 bg-gray-200">
      <div>{children}</div>
    </div>
  );
}
