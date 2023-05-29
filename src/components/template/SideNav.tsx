import { HomeIcon, LogoutIcon, Notifications, SettingsIcon } from "../icons";
import NavItem from "./NavItem";

export default function SideNav() {
  return (
    <aside className="flex flex-col h-full">
      <ul className="flex-grow">
        <NavItem url="http://localhost:3000/" text="Home" icon={HomeIcon} />

        <NavItem
          url="http://localhost:3000/settings"
          text="Settings"
          icon={SettingsIcon}
        />

        <NavItem
          url="http://localhost:3000/notifications"
          text="Notifications"
          icon={Notifications}
        />
      </ul>
      <ul>
        <NavItem
          url="http://localhost:3000/logout"
          text="Logout"
          icon={LogoutIcon}
          // onClick={logout}
          // className={`
          //     text-red-600 dark:text-red-400
          //     hover:bg-red-400 hover:text-white
          //     dark:hover:text-white
          // `}
        />
      </ul>
    </aside>
  );
}
