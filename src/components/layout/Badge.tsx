'use client';

import React from 'react';

interface BadgeProps {
    text?: string;
    color?: string; 
    isCircle?: boolean;
    textColor?: string; 
    onClick?: () => void;
    icon?: React.ReactNode;
}

const Badge = ({ text, icon, color = '#4D44B5', textColor = 'white', isCircle, onClick }: BadgeProps) => {
    const baseClasses = `inline-flex items-center justify-center font-medium text-xs whitespace-nowrap`;
    const shapeClasses = isCircle ? 'rounded-full p-2 cursor-pointer select-none' : 'rounded-full px-3 py-1.5 gap-1';
    const combinedClasses = `${baseClasses} ${shapeClasses}`;
    
    return (
        <div
            onClick={onClick}
            className={combinedClasses}
            style={{ backgroundColor: color, color: textColor }}
        >
            {icon && <span>{icon}</span>}
            {text && <span>{text}</span>}
        </div>
    );
};

export default Badge;
