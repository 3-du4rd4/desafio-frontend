'use client';

import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@/utils/window';
import Header from '@/components/layout/Header';
import Button from '@/components/layout/Button';
import React, { useEffect, useState } from 'react';
import Pagination from '@/components/layout/Pagination';
import { useStudents } from '@/contexts/StudentsContext';
import SortButton from '@/components/students/SortButton';
import CardSkeleton from '@/components/students/CardSkeleton';
import StudentsCard from '@/components/students/StudentsCard';
import StudentsTable from '@/components/students/StudentsTable';
import TableSkeleton from '@/components/students/TableSkeleton';

import { Plus } from 'lucide-react';

export default function StudentsPage() {
    const [loadingData, setLoadingData] = useState(true);
    const { students, currentPage, rowsPerPage } = useStudents();

    const router = useRouter();
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = students.slice(startIndex, startIndex + rowsPerPage);

    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        setLoadingData(true);
        const timer = setTimeout(() => setLoadingData(false), 1000);
        return () => clearTimeout(timer);
    }, [students]);

    const StudentsDisplay = () => {
        if (loadingData) {
            return isMobile ? <CardSkeleton /> : <TableSkeleton rowsPerPage={rowsPerPage} />;
        }
        return isMobile 
            ? <StudentsCard currentData={currentData} students={currentData} /> 
            : <StudentsTable currentData={currentData} students={students} />;
    };

    return (
        <div className="flex flex-col gap-6">
            <Header title="Students" />

            <div className="flex items-center justify-end gap-4 flex-wrap">
                <SortButton />
                <Button 
                    title="New Student" 
                    isFilled 
                    onClick={() => router.push('/students/new')}
                    iconPosition="left"
                    icon={<Plus size={16} strokeWidth={3} />} 
                />
            </div>

            <section className='pb-6 lg:pt-6 flex flex-col gap-8 md:bg-white rounded-2xl md:shadow'>
                <StudentsDisplay />
                <div className='flex justify-end px-2'>
                    <Pagination totalItems={students.length} />
                </div>
            </section>
        </div>
    );
}
