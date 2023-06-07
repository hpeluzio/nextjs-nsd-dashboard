'use client';

import { RootState } from '@/app/redux/store';
import { useSelector } from 'react-redux';
import { EnvelopeIcon, HomeIcon, InfoIcon, LoginIcon, Notifications, SettingsIcon, SignUpIcon } from '../icons';
import NavItem from './NavItem';

export default function SideNav() {
  const { navbar } = useSelector((state: RootState) => state.layout);

  return (
    <aside
      className={`
        flex flex-col bg-neutral-500 dark:bg-neutral-700 
        ${navbar ? 'w-64' : 'w-20'}
        transition-all
      `}
    >
      <ul className={`flex flex-col flex-grow`}>
        <NavItem url="http://localhost:3000/" text="Home" icon={HomeIcon} />
        <NavItem url="http://localhost:3000/settings" text="Settings" icon={SettingsIcon} />
        <NavItem url="http://localhost:3000/notifications" text="Notifications" icon={Notifications} />
        <NavItem url="http://localhost:3000/contact" text="Contact" icon={EnvelopeIcon} />
        <NavItem url="http://localhost:3000/about" text="About" icon={InfoIcon} />
        <NavItem url="http://localhost:3000/login" text="Login" icon={LoginIcon} />
        <NavItem url="http://localhost:3000/register" text="Register" icon={SignUpIcon} />
        <NavItem url="http://localhost:3000/fetching" text="Fetching" icon={SettingsIcon} />
      </ul>
    </aside>
  );
}
