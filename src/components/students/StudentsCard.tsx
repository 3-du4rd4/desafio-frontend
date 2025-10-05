'use client';

import Button from '../layout/Button';
import { formatDate } from '@/utils/date';
import { useRouter } from 'next/navigation';
import { getInitials } from '@/utils/string';
import Badge from '@/components/layout/Badge';
import Skeleton from 'react-loading-skeleton';
import { getGradeColor } from '@/utils/students';
import 'react-loading-skeleton/dist/skeleton.css';
import React, { useEffect, useState } from 'react';
import { Student, useStudents } from '@/contexts/StudentsContext';

import { Phone, Mail, ClipboardCheck, LibraryBig, Plus } from 'lucide-react';


const StudentsCard = ({ currentData, students }: { currentData: Student[], students: Student[] }) => {
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
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 !pb-0'>
                    {currentData.map((student) => (
                        <div key={student.id} className="text-[#303972] border border-gray-100 rounded-lg p-4 flex flex-col gap-4 shadow-sm">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <span className="w-12 p-1 aspect-square rounded-full bg-[#C1BBEB] text-white flex items-center justify-center text-base font-medium">
                                    {getInitials(student.name)}
                                </span>

                                <div className='flex items-center gap-3 flex-wrap'>
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
                                    <Badge text={student.grade} 
                                    color={getGradeColor(student.grade)} 
                                />
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold">{student.name}</h4>
                                <p className="text-[#4D44B5]/70 text-xs">{formatDate(student.date)}  •  {student.city}</p>
                            </div>
                            
                            <span className="text-xs text-gray-500">Responsável: {student.parentName}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentsCard;
