'use client';

import Content from './Content';
import HtmlHead from './HtmlHead';
import SideNav from './SideNav';
import TopBar from './TopBar';
import '@/app/styles/globals.css';

interface Props {
  title: string;
  description: string;
  children?: any;
}

export default function Layout({ title, description, children }: Props) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <HtmlHead title={title} description={description} />
      <TopBar />
      <div className="flex flex-grow">
        <SideNav />
        <Content> {children}</Content>
      </div>
    </div>
  );
}
