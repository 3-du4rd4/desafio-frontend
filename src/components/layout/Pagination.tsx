'use client';

import React from 'react';
import Button from './Button';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStudents } from '@/contexts/StudentsContext';

interface PaginationProps {
    totalItems: number;
}

const Pagination = ({ totalItems }: PaginationProps) => {
    const { currentPage, setCurrentPage, rowsPerPage } = useStudents();
    const totalPages = Math.ceil(totalItems / rowsPerPage);

    return (
        <div className="flex items-center justify-center gap-2 flex-wrap">
            <Button
            isCircle
            noBorder
            isFilled={false}
            icon={<ChevronLeft size={14} strokeWidth={3} />}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            />

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
                isCircle
                key={page}
                title={page.toString()}
                className='text-sm w-7.5 h-7.5'
                isFilled={page === currentPage}
                onClick={() => setCurrentPage(page)}
            />
            ))}

            <Button
            isCircle
            noBorder
            isFilled={false}
            icon={<ChevronRight size={14} strokeWidth={3} />}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            />
        </div>
    );
};

export default Pagination;
