'use client';

import Button from '../layout/Button';
import { formatDate } from '@/utils/date';
import { useRouter } from 'next/navigation';
import { getInitials } from '@/utils/string';
import Badge from '@/components/layout/Badge';
import Pagination from '../layout/Pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import React, { useEffect, useState } from 'react';
import { useStudents } from '@/contexts/StudentsContext';

import { Phone, Mail, ClipboardCheck, LibraryBig, Plus } from 'lucide-react';

const gradeColors: Record<string, string> = {
  'VII A': '#FB7D5B',  
  'VII B': '#FCC43E',     
  'VII C': '#4D44B5',      
};

const StudentsTable = () => {
    const [loading, setLoading] = useState(true);

    const { students, currentPage, rowsPerPage } = useStudents();
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const router = useRouter();
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = students.slice(startIndex, startIndex + rowsPerPage);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [students]);

    const handleCopy = (id: string, content: string) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
    };

    return (
        <div>
            {loading ? (
                <div className='flex flex-col gap-8 bg-white rounded-2xl shadow pb-6'>
                    <div className='overflow-x-auto'>
                        <table className="min-w-full overflow-hidden">
                            <thead className="text-[#303972] border-b border-gray-200">
                            <tr>
                                <th className="p-3 lg:p-4 text-left text-xs"><Skeleton width={150} height={20} /></th>
                                <th className="p-3 lg:p-4 text-left text-xs"><Skeleton width={80} height={20} /></th>
                                <th className="p-3 lg:p-4 text-left text-xs"><Skeleton width={100} height={20} /></th>
                                <th className="p-3 lg:p-4 text-left text-xs"><Skeleton width={120} height={20} /></th>
                                <th className="p-3 lg:p-4 text-left text-xs"><Skeleton width={100} height={20} /></th>
                                <th className="p-3 lg:p-4 text-left text-xs"><Skeleton width={60} height={20} /></th>
                                <th className="p-3 lg:p-4 text-left text-xs"><Skeleton width={60} height={20} /></th>
                                <th className="p-3 lg:p-4 text-left text-xs"><Skeleton width={80} height={20} /></th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array(rowsPerPage).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                <td className="py-2 px-4 lg:py-4 lg:px-6"><Skeleton width={150} height={20} /></td>
                                <td className="py-2 px-4 lg:py-4 lg:px-6"><Skeleton width={80} height={20} /></td>
                                <td className="py-2 px-4 lg:py-4 lg:px-6"><Skeleton width={100} height={20} /></td>
                                <td className="py-2 px-4 lg:py-4 lg:px-6"><Skeleton width={120} height={20} /></td>
                                <td className="py-2 px-4 lg:py-4 lg:px-6"><Skeleton width={100} height={20} /></td>
                                <td className="py-2 px-4 lg:py-4 lg:px-6"><Skeleton width={60} height={20} /></td>
                                <td className="py-2 px-4 lg:py-4 lg:px-6"><Skeleton width={60} height={20} /></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : students.length === 0 ? (
                <div className='flex flex-col gap-8 bg-white rounded-2xl shadow p-6'>
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
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default StudentsTable;
