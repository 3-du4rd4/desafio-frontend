'use client';

import React, { useContext, useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import Badge from '@/components/layout/Badge';
import Pagination from '../layout/Pagination';
import { formatDate } from '@/utils/date';
import { useStudents } from '@/contexts/StudentsContext';
import { getInitials } from '@/utils/string';

const gradeColors: Record<string, string> = {
  'VII A': '#FB7D5B',  
  'VII B': '#FCC43E',     
  'VII C': '#4D44B5',      
};

const StudentsTable = () => {
    const { students, currentPage, rowsPerPage } = useStudents();

    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = students.slice(startIndex, startIndex + rowsPerPage);


    return (
        <div className='flex flex-col gap-8 bg-white rounded-2xl shadow pb-6'>
            <div className='overflow-x-auto'>
                <table className="min-w-full overflow-hidden">
                    <thead className="text-[#303972] border-b border-gray-200">
                        <tr>
                        <th className="p-3 lg:p-4 text-left text-xs">Name</th>
                        <th className="p-3 lg:p-4 text-left text-xs">ID</th>
                        <th className="p-3 lg:p-4 text-left text-xs">Date</th>
                        <th className="p-3 lg:p-4 text-left text-xs">Parent Name</th>
                        <th className="p-3 lg:p-4 text-left text-xs">City</th>
                        <th className="p-3 lg:p-4 text-left text-xs">Contact</th>
                        <th className="p-3 lg:p-4 text-left text-xs">Grade</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 text-[#303972] text-xs lg:text-sm'>
                        {currentData.map(student => (
                        <tr key={student.id} className=" hover:bg-[#f7f8fe] transition-colors">
                            <td className="py-2 px-4 lg:py-4 lg:px-6 font-semibold flex items-center gap-2">
                                <span className="w-6 lg:w-8 p-1 aspect-square rounded-full bg-[#C1BBEB] text-white flex items-center justify-center text-xs lg:text-sm font-medium">
                                    {getInitials(student.name)}
                                </span>
                                {student.name}
                            </td>
                            <td className="py-1 px-2 lg:py-2 lg:px-4 text-[#4D44B5]">{student.id}</td>
                            <td className="py-1 px-2 lg:py-2 lg:px-4 text-[#A098AE]">{formatDate(student.date)}</td>
                            <td className="py-1 px-2 lg:py-2 lg:px-4">{student.parentName}</td>
                            <td className="py-1 px-2 lg:py-2 lg:px-4">{student.city}</td>
                            <td className="py-1 px-2 lg:py-2 lg:px-4">
                                <div className='flex items-center justify-between gap-3'>
                                    <Badge icon={<Phone size={16} strokeWidth={2} />} color='#E0E0FF' textColor='#4D44B5' isCircle />
                                    <Badge icon={<Mail size={16} strokeWidth={2} />} color='#E0E0FF' textColor='#4D44B5' isCircle />
                                </div>
                            </td>
                            <td className="py-1 px-2 lg:py-2 lg:px-4">
                                <Badge text={student.grade} 
                                    color={gradeColors[student.grade] ?? '#E0E0FF'} 
                                />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-end px-2'>
                
                <Pagination totalItems={students.length} />
            </div>
        </div>
    );
};

export default StudentsTable;
