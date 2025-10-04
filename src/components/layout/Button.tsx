'use client';

import React from 'react';

interface ButtonProps {
    title?: string;
    isFilled?: boolean;
    disabled?: boolean;
    className?: string;
    noBorder?: boolean;
    isCircle?: boolean;
    onClick: () => void;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const Button = ({
    icon,
    onClick,
    title = '',
    className = '',
    disabled = false,
    isFilled = false,
    noBorder = false,
    isCircle = false,
    iconPosition = 'left',
}: ButtonProps) => {
    let baseClasses = `flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer font-medium`;

    if (isCircle) {
        baseClasses += ' rounded-full p-2'; 
    } else {
        baseClasses += ' rounded-full px-6 py-3';
    }

    if (isFilled) {
        baseClasses += ' bg-[#4D44B5] text-white hover:bg-[#3C3A8F]';
    } else {
        baseClasses += ` bg-transparent text-[#4D44B5] ${noBorder ? '' : 'border border-[#4D44B5]'} hover:bg-[#4D44B5] hover:text-white`;
    }

    if (disabled) {
        baseClasses += ' opacity-50 cursor-not-allowed';
    }

    baseClasses += ` ${className}`;

    return (
        <button className={baseClasses} onClick={onClick} disabled={disabled}>
            {icon && iconPosition === 'left' && <span>{icon}</span>}
            {title}
            {icon && iconPosition === 'right' && <span>{icon}</span>}
        </button>
    );
};

export default Button;
