'use client';

import Content from './Content';
import HtmlHead from './HtmlHead';
import SideNav from './SideNav';
import TopBar from './TopBar';

interface Props {
  title: string;
  description: string;
  children?: any;
}

export default function Layout({ title, description, children }: Props) {
  return (
    <div className="flex flex-col h-screen w-screen bg-neutral-100 dark:bg-neutral-800">
      <HtmlHead title={title} description={description} />
      <TopBar />
      <div className="flex flex-grow">
        <SideNav />
        <Content> {children}</Content>
      </div>
    </div>
  );
}
