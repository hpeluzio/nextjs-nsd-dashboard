import Logo from "./Logo";

export default function TopBar() {
  return (
    <div className="flex bg-gradient-to-r from-indigo-500 to-blue-300 h-16 w-full items-center p-5">
      <Logo />
    </div>
  );
}
