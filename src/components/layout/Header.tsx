import React from 'react';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between my-3 lg:my-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-[#4D44B5] transition-all duration-300">
        {title}
      </h1>
    </header>
  );
};

export default Header;