'use-client';
import { HomeIcon, Notifications, SettingsIcon } from '../icons';
import LogoutNavItem from './LogoutNavItem';
import NavItem from './NavItem';

export default function SideNav() {
  return (
    <aside className="flex flex-col h-full">
      <ul className="flex-grow">
        <NavItem url="http://localhost:3000/" text="Home" icon={HomeIcon} />

        <NavItem url="http://localhost:3000/pages/settings" text="Settings" icon={SettingsIcon} />

        <NavItem url="http://localhost:3000/pages/notifications" text="Notifications" icon={Notifications} />
      </ul>
      <ul>
        <LogoutNavItem />
      </ul>
    </aside>
  );
}
