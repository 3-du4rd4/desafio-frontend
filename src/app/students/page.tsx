'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Button from '@/components/layout/Button';
import SortButton from '@/components/students/SortButton';
import StudentsTable from '@/components/students/StudentsTable';

import { Plus } from 'lucide-react';

export default function StudentsPage() {
    const router = useRouter();

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

            <section className='py-6'>
                <StudentsTable />
            </section>
        </div>
    );
}
