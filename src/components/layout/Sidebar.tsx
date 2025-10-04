'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, Users, UserPlus, User, HandCoins, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const pathname = usePathname();

  const links = [
    { label: 'Dashboard', href: '/', icon: House },
    { label: 'Students', href: '/students', icon: Users },
    { label: 'Add Student', href: '/add-student', icon: UserPlus },
    { label: 'Teachers', href: '/teachers', icon: Users },
    { label: 'Finance', href: '/finance', icon: HandCoins },
    { label: 'User', href: '/user', icon: User },
  ];

  return (
    <div className={`fixed lg:static top-0 left-0 z-50 w-3/4 lg:w-72 h-screen bg-[#4D44B5] shadow-md p-6 !pr-0 flex flex-col transform transition-transform duration-300
                     ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                     lg:translate-x-0`}>
        <div className='lg:hidden flex justify-end pr-4'>
          <button
              className="p-2 cursor-pointer"
              onClick={() => setIsOpen(false)}
          >
              <X className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>
        </div>
        <div className='flex items-center justify-center gap-3 p-6 !pr-12'>
          <span className='text-3xl font-bold px-2 py-0.5 rounded-2xl bg-[#FB7D5B]'>A</span>
          <h1 className="text-3xl font-bold">Akademi</h1>
        </div>

        <nav className="flex flex-col gap-4 p-4 !pr-0">
            {links.map((link) => {
            const Icon = link.icon || (() => null);  
            const isActive = pathname === link.href;
            return (
                <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)} 
                className={`px-6 py-4 rounded-l-full flex items-center gap-4 ${
                    isActive ? 'text-[#4D44B5] bg-[#F3F4FF] font-medium' : 
                               'text-white hover:bg-[#F3F4FF]/85 hover:text-[#4D44B5] transition-colors duration-200'
                }`}
                >
                <Icon size={24} />
                {link.label}
                </Link>
            );
            })}
        </nav>
    </div>
  );
};

export default Sidebar;
