'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Button from '@/components/layout/Button';

import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import StudentsTable from '@/components/students/StudentsTable';
import Pagination from '@/components/layout/Pagination';

export default function StudentsPage() {
    const [isNewest, setIsNewest] = useState(true);

    const handleToggleOrder = () => setIsNewest(!isNewest);
    
    return (
        <div className="flex flex-col gap-6">
            <Header title="Students" />

            <div className="flex items-center justify-end gap-4 flex-wrap">
                <Button 
                    iconPosition="right" 
                    onClick={handleToggleOrder} 
                    title={isNewest ? 'Newest' : 'Oldest'}
                    icon={isNewest ? <ChevronDown size={16} strokeWidth={3} /> : <ChevronUp size={16} strokeWidth={3} />}
                />
                <Button 
                    title="New Student" 
                    isFilled 
                    onClick={() => {}} 
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
