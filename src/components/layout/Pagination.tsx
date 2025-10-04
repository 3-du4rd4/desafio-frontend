'use client';

import React from 'react';
import Button from './Button';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 flex-wrap">
            <Button
            isCircle
            noBorder
            isFilled={false}
            icon={<ChevronLeft size={14} strokeWidth={3} />}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            />

            {pages.map((page) => (
            <Button
                isCircle
                key={page}
                title={page.toString()}
                className='text-sm w-7.5 h-7.5'
                isFilled={page === currentPage}
                onClick={() => onPageChange(page)}
            />
            ))}

            <Button
            isCircle
            noBorder
            isFilled={false}
            icon={<ChevronRight size={14} strokeWidth={3} />}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            />
        </div>
    );
};

export default Pagination;
