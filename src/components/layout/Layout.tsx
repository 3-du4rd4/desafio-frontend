'use client'

import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar'; 
import { Menu } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            <div className={`lg:hidden fixed z-50 w-full p-2 transition-all duration-300 ${isOpen ? '' : 'bg-[#F3F4FF]'}`}>
                <button
                    className="p-2 rounded cursor-pointer hover:bg-[#4D44B5]/50 transition-colors duration-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu className="w-6 h-6 text-[#4D44B5]" />
                </button>
            </div>

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

            <main className={`flex-1 bg-[#F3F4FF] p-6 md:px-8 overflow-auto h-screen transition-opacity duration-300 !pt-14 lg:!pt-6 ${isOpen ? 'opacity-50' : ''}`}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
