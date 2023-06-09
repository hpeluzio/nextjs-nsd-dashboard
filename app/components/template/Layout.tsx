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
    <div className="flex flex-col w-screen bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100">
      <HtmlHead title={title} description={description} />
      <TopBar />
      <div className="flex">
        <SideNav />
        <Content> {children}</Content>
      </div>
    </div>
  );
}
