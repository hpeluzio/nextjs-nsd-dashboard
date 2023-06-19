'use client';

import { RootState } from '@/app/redux/store';
import { useSelector } from 'react-redux';
import { CalculatorIcon, EnvelopeIcon, HomeIcon, InfoIcon, LoginIcon, Notifications, PencilIcon, PencilNoteIcon, SettingsIcon, SignUpIcon } from '../icons';
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
        <NavItem url="/" text="Home" icon={HomeIcon} />
        <NavItem url="/settings" text="Settings" icon={SettingsIcon} />
        <NavItem url="/notifications" text="Notifications" icon={Notifications} />
        <NavItem url="/mnist" text="Mnist" icon={CalculatorIcon} />
        <NavItem url="/onnxruntime" text="Onnxruntime Web" icon={CalculatorIcon} />
        <NavItem url="/drawing" text="Drawing" icon={PencilIcon} />
        <NavItem url="/canvasdraw" text="Canvas" icon={PencilNoteIcon} />
        <NavItem url="/contact" text="Contact" icon={EnvelopeIcon} />
        <NavItem url="/about" text="About" icon={InfoIcon} />
        <NavItem url="/login" text="Login" icon={LoginIcon} />
        <NavItem url="/register" text="Register" icon={SignUpIcon} />
        <NavItem url="/fetching" text="Fetching" icon={SettingsIcon} />
      </ul>
    </aside>
  );
}
