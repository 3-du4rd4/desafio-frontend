'use client';

import React from 'react';
import { Phone, Mail } from 'lucide-react';
import Badge from '@/components/layout/Badge';

interface Student {
    id: string;
    name: string;
    date: string;
    parentName: string;
    city: string;
    grade: string;
}

interface StudentsTableProps {
    students?: Student[];
}

const gradeColors: Record<string, string> = {
  'VII A': '#FB7D5B',  
  'VII B': '#FCC43E',     
  'VII C': '#4D44B5',      
};

const StudentsTable = ({ students }: StudentsTableProps) => {
    const defaultStudents: Student[] = [
        { id: '#123456789', name: 'Samanta William', date: '2023-01-01', parentName: 'Maria William', city: 'Jakarta', grade: 'VII A' },
        { id: '#987654321', name: 'Bob Smith', date: '2023-01-02', parentName: 'Jane Smith', city: 'Los Angeles', grade: 'VII B' },
        { id: '#456789123', name: 'Carol Davis', date: '2023-01-03', parentName: 'Mike Davis', city: 'Chicago', grade: 'VII C' },
    ];

    const data = students ?? defaultStudents;

    return (
        <table className="min-w-full bg-white rounded-2xl shadow overflow-hidden">
            <thead className="text-[#303972] border-b border-gray-200">
                <tr>
                <th className="p-6 text-left text-xs">Name</th>
                <th className="p-6 text-left text-xs">ID</th>
                <th className="p-6 text-left text-xs">Date</th>
                <th className="p-6 text-left text-xs">Parent Name</th>
                <th className="p-6 text-left text-xs">City</th>
                <th className="p-6 text-left text-xs">Contact</th>
                <th className="p-6 text-left text-xs">Grade</th>
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 text-[#303972] text-sm'>
                {data.map(student => (
                <tr key={student.id} className=" hover:bg-[#f7f8fe] transition-colors">
                    <td className="py-3 px-6">{student.name}</td>
                    <td className="py-3 px-6 text-[#4D44B5]">{student.id}</td>
                    <td className="py-3 px-6 text-[#A098AE]">{student.date}</td>
                    <td className="py-3 px-6">{student.parentName}</td>
                    <td className="py-3 px-6">{student.city}</td>
                    <td className="py-3 px-6">
                        <div className='flex items-center justify-between gap-3'>
                            <Badge icon={<Phone size={16} strokeWidth={2} />} color='#E0E0FF' textColor='#4D44B5' isCircle />
                            <Badge icon={<Mail size={16} strokeWidth={2} />} color='#E0E0FF' textColor='#4D44B5' isCircle />
                        </div>
                    </td>
                    <td className="py-3 px-6">
                        <Badge text={student.grade} 
                            color={gradeColors[student.grade] ?? '#E0E0FF'} 
                        />
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StudentsTable;
