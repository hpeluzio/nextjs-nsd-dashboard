'use client';
import { RootState } from '@/app/redux/store';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { HomeIcon, Notifications, SettingsIcon } from '../icons';
import LogoutNavItem from './LogoutNavItem';
import NavItem from './NavItem';

export default function SideNav() {
  const { theme, navbar } = useSelector((state: RootState) => state.layout);

  const cssBackground = useMemo(() => {
    if (theme === 'LIGHT') return 'bg-sky-200';
    if (theme === 'DARK') return 'bg-sky-900';
    return 'bg-sky-200';
  }, [theme]);

  const cssNavbar = useMemo(() => {
    if (navbar) return 'w-80';
    if (!navbar) return 'w-16';
    return 'w-80';
  }, [navbar]);

  return (
    <aside
      className={`
      flex flex-col ${cssNavbar} ${cssBackground}
    `}
    >
      <ul className="flex-grow">
        <NavItem url="http://localhost:3000/" text="Home" icon={HomeIcon} />
        <NavItem url="http://localhost:3000/settings" text="Settings" icon={SettingsIcon} />
        <NavItem url="http://localhost:3000/notifications" text="Notifications" icon={Notifications} />
        <NavItem url="http://localhost:3000/contact" text="Contact" icon={Notifications} />
        <NavItem url="http://localhost:3000/about" text="About" icon={Notifications} />
        <NavItem url="http://localhost:3000/login" text="Login" icon={Notifications} />
        <NavItem url="http://localhost:3000/register" text="Register" icon={Notifications} />
        <NavItem url="http://localhost:3000/fetching" text="Fetching" icon={SettingsIcon} />
      </ul>
      <ul>
        <LogoutNavItem />
      </ul>
    </aside>
  );
}
