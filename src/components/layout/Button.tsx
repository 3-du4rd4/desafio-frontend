'use client';

import React from 'react';

interface ButtonProps {
    title: string;
    isFilled?: boolean;
    disabled?: boolean;
    className?: string;
    onClick: () => void;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const Button = ({
    icon,
    title,
    onClick,
    className = '',
    disabled = false,
    isFilled = false,
    iconPosition = 'left',
}: ButtonProps) => {
    return (
        <button
            className={`
                flex items-center justify-center gap-2 px-6 py-3 rounded-full
                transition-all duration-300 cursor-pointer font-medium
                ${isFilled 
                    ? 'bg-[#4D44B5] text-white hover:bg-[#3C3A8F]' 
                    : 'bg-transparent text-[#4D44B5] border border-[#4D44B5] hover:bg-[#4D44B5] hover:text-white'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && iconPosition === 'left' && <span>{icon}</span>}
            {title}
            {icon && iconPosition === 'right' && <span>{icon}</span>}
        </button>
    );
};

export default Button;
