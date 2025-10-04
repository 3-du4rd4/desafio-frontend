'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';

export interface Student {
    id: string;
    name: string;
    date: string;
    city: string;
    grade: string;
    phone: string;
    email: string;
    parentName: string;
}

interface StudentsContextProps {
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    sortByNewest: () => void;
    sortByOldest: () => void;
    totalPages: number;
    currentPage: number;
    rowsPerPage: number;
    setCurrentPage: (page: number) => void;
}

export const StudentsContext = createContext<StudentsContextProps | undefined>(undefined);

const defaultStudents: Student[] = [
    { id: '#123456789', name: 'Samanta William', date: '2023-01-01', parentName: 'Maria William', city: 'Jakarta', phone: '123456789', email: 'R5Y3o@example.com', grade: 'VII A' },
    { id: '#987654321', name: 'Bob Smith', date: '2023-02-02', parentName: 'Jane Smith', city: 'Los Angeles', phone: '987654321', email: 'B0B@example.com', grade: 'VII B' },
    { id: '#456789123', name: 'Carol Davis', date: '2023-01-03', parentName: 'Mike Davis', city: 'Chicago', phone: '456789123', email: 'C4R0L@example.com', grade: 'VII C' },
    { id: '#000000000', name: 'Samanta William', date: '2023-01-01', parentName: 'Maria William', city: 'Jakarta', phone: '000000000', email: 'S4M@example.com', grade: 'VII A' },
    { id: '#111111111', name: 'Bob Smith', date: '2023-01-02', parentName: 'Jane Smith', city: 'Los Angeles', phone: '111111111', email: 'B0B1@example.com', grade: 'VII B' },
    { id: '#222222222', name: 'Carol Davis', date: '2023-01-03', parentName: 'Mike Davis', city: 'Chicago', phone: '222222222', email: 'C4R2L@example.com', grade: 'VII C' },
    { id: '#333333333', name: 'Samanta William', date: '2023-01-01', parentName: 'Maria William', city: 'Jakarta', phone: '333333333', email: 'S4M3@example.com', grade: 'VII A' },
    { id: '#444444444', name: 'Bob Smith', date: '2023-01-02', parentName: 'Jane Smith', city: 'Los Angeles', phone: '444444444', email: 'B0B4@example.com', grade: 'VII B' },
    { id: '#555555555', name: 'Carol Davis', date: '2023-01-03', parentName: 'Mike Davis', city: 'Chicago', phone: '555555555', email: 'C4R5L@example.com', grade: 'VII C' },
    { id: '#666666666', name: 'Samanta William', date: '2023-01-01', parentName: 'Maria William', city: 'Jakarta', phone: '666666666', email: 'S4M6@example.com', grade: 'VII A' },
    { id: '#777777777', name: 'Bob Smith', date: '2023-01-02', parentName: 'Jane Smith', city: 'Los Angeles', phone: '777777777', email: 'B0B7@example.com', grade: 'VII B' },
    { id: '#888888888', name: 'Carol Davis', date: '2023-01-03', parentName: 'Mike Davis', city: 'Chicago', phone: '888888888', email: 'C4R8L@example.com', grade: 'VII C' },
];

export const StudentsProvider = ({ children }: { children: ReactNode }) => {
    const [students, setStudents] = useState<Student[]>(
        [...defaultStudents].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
    );

    const sortByNewest = () => {
        setStudents((prev) =>
        [...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        );
    };

    const sortByOldest = () => {
        setStudents((prev) =>
        [...prev].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        );
    };

    const rowsPerPage = 6;
    const totalPages = Math.ceil(students.length / rowsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <StudentsContext.Provider value={{ students, setStudents, sortByNewest, sortByOldest, currentPage, setCurrentPage, totalPages, rowsPerPage }}>
            {children}
        </StudentsContext.Provider>
    );
};

export const useStudents = () => {
    const context = useContext(StudentsContext);
    if (!context) {
        throw new Error('useStudents must be used within a StudentsProvider');
    }
    return context;
};
