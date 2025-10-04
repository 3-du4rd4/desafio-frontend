'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface StudentsContextProps {
    totalPages: number;
    currentPage: number;
    rowsPerPage: number;
    setCurrentPage: (page: number) => void;
}

export const StudentsContext = createContext<StudentsContextProps | undefined>(undefined);

export const StudentsProvider = ({ children }: { children: ReactNode }) => {
    const totalPages = 5;
    const rowsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <StudentsContext.Provider value={{ currentPage, setCurrentPage, totalPages, rowsPerPage }}>
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
