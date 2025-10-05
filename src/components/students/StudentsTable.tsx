'use client';

import Button from '../layout/Button';
import React, { useState } from 'react';
import { formatDate } from '@/utils/date';
import { useRouter } from 'next/navigation';
import { getInitials } from '@/utils/string';
import Badge from '@/components/layout/Badge';
import { getGradeColor } from '@/utils/students';
import 'react-loading-skeleton/dist/skeleton.css';
import { Student } from '@/contexts/StudentsContext';

import { Phone, Mail, ClipboardCheck, LibraryBig, Plus } from 'lucide-react';

const StudentsTable = ({ currentData, students }: { currentData: Student[], students: Student[] }) => {
    const router = useRouter();

    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (id: string, content: string) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
    };

    return (
        <div>
            {students.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <LibraryBig size={60} color="#C1BBEB" />
                        <p className="text-[#4D44B5] font-medium max-w-md text-center">
                            Ops! Nenhum estudante foi adicionado ainda. Comece cadastrando um novo estudante.
                        </p>
                        <Button title="New Student" 
                            isFilled 
                            onClick={() => router.push('/students/new')}
                            iconPosition="left"
                            icon={<Plus size={16} strokeWidth={3} />}  
                        />
                    </div>
            ) : (
                    <div className='overflow-x-auto'>
                        <table className="min-w-full overflow-hidden">
                            <thead className="text-[#303972] border-b border-gray-200">
                                <tr>
                                <th className="p-4 text-left text-xs">Name</th>
                                <th className="p-4 text-left text-xs">ID</th>
                                <th className="p-4 text-left text-xs">Date</th>
                                <th className="p-4 text-left text-xs">Parent Name</th>
                                <th className="p-4 text-left text-xs">City</th>
                                <th className="p-4 text-left text-xs">Contact</th>
                                <th className="p-4 text-left text-xs">Grade</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200 text-[#303972] text-sm'>
                                {currentData.map(student => (
                                <tr key={student.id} className=" hover:bg-[#f7f8fe] transition-colors">
                                    <td className="py-4 px-6 font-semibold flex items-center gap-2">
                                        <span className="w-8 p-1 aspect-square rounded-full bg-[#C1BBEB] text-white flex items-center justify-center text-sm font-medium">
                                            {getInitials(student.name)}
                                        </span>
                                        {student.name}
                                    </td>
                                    <td className="py-2 px-4 text-[#4D44B5]">{student.id}</td>
                                    <td className="py-2 px-4 text-[#A098AE]">{formatDate(student.date)}</td>
                                    <td className="py-2 px-4">{student.parentName}</td>
                                    <td className="py-2 px-4">{student.city}</td>
                                    <td className="py-2 px-4">
                                        <div className='flex items-center gap-3 '>
                                            <div className="relative w-fit">
                                                <Badge 
                                                    icon={
                                                    copiedId === `${student.id}-phone`
                                                        ? <ClipboardCheck size={16} strokeWidth={2} />
                                                        : <Phone size={16} strokeWidth={2} />
                                                    }
                                                    color="#E0E0FF"
                                                    textColor="#4D44B5"
                                                    isCircle
                                                    onClick={() => handleCopy(`${student.id}-phone`, student.phone)}
                                                />

                                                {copiedId === `${student.id}-phone` && (
                                                    <div
                                                    role="tooltip"
                                                    className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#4D44B5] text-white text-xs font-medium px-2 py-1 rounded-md shadow-md animate-fade"
                                                    >
                                                    Copiado!
                                                    <div className="tooltip-arrow"></div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="relative w-fit">
                                                <Badge 
                                                    icon={
                                                    copiedId === `${student.id}-mail`
                                                        ? <ClipboardCheck size={16} strokeWidth={2} />
                                                        : <Mail size={16} strokeWidth={2} />
                                                    }
                                                    color="#E0E0FF"
                                                    textColor="#4D44B5"
                                                    isCircle
                                                    onClick={() => handleCopy(`${student.id}-mail`, student.email)}
                                                />

                                                {copiedId === `${student.id}-mail` && (
                                                    <div
                                                    role="tooltip"
                                                    className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#4D44B5] text-white text-xs font-medium px-2 py-1 rounded-md shadow-md animate-fade-in-out"
                                                    >
                                                    Copiado!
                                                    <div className="tooltip-arrow"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <Badge text={student.grade} 
                                            color={getGradeColor(student.grade)} 
                                        />
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            )}
        </div>
    );
};

export default StudentsTable;
