import Content from "./Content";
import SideNav from "./SideNav";
import TopBar from "./TopBar";

interface LayoutProps {
  title: string;
  subtitle: string;
  children?: any;
}

export default function Layout(props) {
  return (
    <div>
      <TopBar />
      <SideNav />
      <Content />
    </div>
  );
}
