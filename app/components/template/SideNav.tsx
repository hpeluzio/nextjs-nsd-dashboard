'use client';

import useLayout from '@/app/hooks/useLayout';
import { CalculatorIcon, EnvelopeIcon, HomeIcon, InfoIcon, LoginIcon, Notifications, PencilIcon, PencilNoteIcon, SettingsIcon, SignUpIcon } from '../icons';
import NavItem from './NavItem';

export default function SideNav() {
  const layout = useLayout();

  return (
    <aside
      className={`
        flex flex-col bg-neutral-500 dark:bg-neutral-700
        transition-all
        ${layout === 'desktop' ? 'w-64 min-w-20' : 'w-20 min-w-20'}
      `}
    >
      <ul className={`flex flex-col`}>
        <NavItem url="/" text="Home" icon={HomeIcon} />
        <NavItem url="/settings" text="Settings" icon={SettingsIcon} />
        <NavItem url="/notifications" text="Notifications" icon={Notifications} />
        <NavItem url="/mnist" text="Mnist" icon={CalculatorIcon} />
        <NavItem url="/cifar10" text="Cifar10" icon={CalculatorIcon} />
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
