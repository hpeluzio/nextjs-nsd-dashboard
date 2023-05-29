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
    <div className="flex flex-col h-screen w-screen bg-green-200">
      <HtmlHead title={title} description={description} />
      <TopBar />
      <div className="flex flex-grow bg-blue-200">
        <SideNav />
        <Content> {children}</Content>
      </div>

      {/* <div className="flex flex-col bg-gray-300">
       
      </div> */}
    </div>
  );
}
