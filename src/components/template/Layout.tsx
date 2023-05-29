import Content from "./Content";
import HtmlHead from "./HtmlHead";
import SideNav from "./SideNav";
import TopBar from "./TopBar";
import "../../styles/globals.css";

interface Props {
  title: string;
  description: string;
  children?: any;
}

export default function Layout({ title, description, children }: Props) {
  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="h-screen w-screen">
        <SideNav />
        <div className="flex flex-col bg-gray-300">
          <TopBar />
          <Content> {children}</Content>
        </div>
      </div>
    </>
  );
}
