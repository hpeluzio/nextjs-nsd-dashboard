interface Props {
  children?: any;
}

export default function Content({ children }: Props) {
  return (
    <div className="flex flex-col w-full mt-5 p-5 bg-red-400">
      <div>{children}</div>
    </div>
  );
}
