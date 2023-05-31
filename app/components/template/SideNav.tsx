'use client';

import { RootState } from '@/app/redux/store';
import { useSelector } from 'react-redux';
import { HomeIcon, Notifications, SettingsIcon } from '../icons';
import NavItem from './NavItem';

export default function SideNav() {
  const { navbar } = useSelector((state: RootState) => state.layout);

  return (
    <aside
      className={`
        flex flex-col bg-neutral-400 dark:bg-neutral-700 ${navbar ? 'w-80' : 'w-20'}
      `}
    >
      <ul className={`flex flex-col flex-grow`}>
        <NavItem url="http://localhost:3000/" text="Home" icon={HomeIcon} />
        <NavItem url="http://localhost:3000/settings" text="Settings" icon={SettingsIcon} />
        <NavItem url="http://localhost:3000/notifications" text="Notifications" icon={Notifications} />
        <NavItem url="http://localhost:3000/contact" text="Contact" icon={Notifications} />
        <NavItem url="http://localhost:3000/about" text="About" icon={Notifications} />
        <NavItem url="http://localhost:3000/login" text="Login" icon={Notifications} />
        <NavItem url="http://localhost:3000/register" text="Register" icon={Notifications} />
        <NavItem url="http://localhost:3000/fetching" text="Fetching" icon={SettingsIcon} />
      </ul>
    </aside>
  );
}
