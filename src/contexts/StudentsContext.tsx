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
    totalPages: number;
    students: Student[];
    currentPage: number;
    rowsPerPage: number;
    sortByOldest: () => void;
    sortByNewest: () => void;
    setCurrentPage: (page: number) => void;
    addStudent: (student: Student) => void;
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export const StudentsContext = createContext<StudentsContextProps | undefined>(undefined);

const defaultStudents: Student[] = [
  { id: '#123456789', name: 'Laura Mendes', date: '2023-02-15', parentName: 'Ricardo Mendes', city: 'São Paulo', phone: '(11) 91234-5678', email: 'laura.mendes@example.com', grade: 'VII A' },
  { id: '#987654321', name: 'Pedro Santos', date: '2023-03-10', parentName: 'Fernanda Santos', city: 'Rio de Janeiro', phone: '(21) 99876-5432', email: 'pedro.santos@example.com', grade: 'VII B' },
  { id: '#456789123', name: 'Camila Rocha', date: '2023-01-25', parentName: 'André Rocha', city: 'Belo Horizonte', phone: '(31) 98765-4321', email: 'camila.rocha@example.com', grade: 'VII C' },
  { id: '#000000001', name: 'Lucas Almeida', date: '2023-02-01', parentName: 'Patrícia Almeida', city: 'Curitiba', phone: '(41) 99654-3210', email: 'lucas.almeida@example.com', grade: 'VII A' },
  { id: '#000000002', name: 'Isabela Costa', date: '2023-01-18', parentName: 'Marcos Costa', city: 'Fortaleza', phone: '(85) 98877-6655', email: 'isabela.costa@example.com', grade: 'VII B' },
  { id: '#000000003', name: 'Rafael Oliveira', date: '2023-03-05', parentName: 'Renata Oliveira', city: 'Recife', phone: '(81) 99777-8899', email: 'rafael.oliveira@example.com', grade: 'VII C' },
  { id: '#000000004', name: 'Ana Beatriz Lima', date: '2023-02-11', parentName: 'Sérgio Lima', city: 'Brasília', phone: '(61) 99911-2233', email: 'ana.lima@example.com', grade: 'VII A' },
  { id: '#000000005', name: 'Gustavo Pereira', date: '2023-03-20', parentName: 'Daniela Pereira', city: 'Salvador', phone: '(71) 99123-4567', email: 'gustavo.pereira@example.com', grade: 'VII B' },
  { id: '#000000006', name: 'Mariana Torres', date: '2023-01-29', parentName: 'Eduardo Torres', city: 'Porto Alegre', phone: '(51) 99888-7766', email: 'mariana.torres@example.com', grade: 'VII C' },
  { id: '#000000007', name: 'Felipe Souza', date: '2023-02-07', parentName: 'Cláudia Souza', city: 'Florianópolis', phone: '(48) 99777-1122', email: 'felipe.souza@example.com', grade: 'VII A' },
  { id: '#000000008', name: 'Sofia Nunes', date: '2023-03-02', parentName: 'Paulo Nunes', city: 'Vitória', phone: '(27) 99222-3344', email: 'sofia.nunes@example.com', grade: 'VII B' },
  { id: '#000000009', name: 'Matheus Ribeiro', date: '2023-01-12', parentName: 'Juliana Ribeiro', city: 'Campinas', phone: '(19) 99444-5566', email: 'matheus.ribeiro@example.com', grade: 'VII C' },
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

    const addStudent = (student: Student) => {
        setStudents(prev => [...prev, student]);
    };

    const rowsPerPage = 6;
    const totalPages = Math.ceil(students.length / rowsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <StudentsContext.Provider
            value={{ students, setStudents, sortByNewest, sortByOldest,
                currentPage, setCurrentPage, totalPages, rowsPerPage,
                addStudent 
            }}
        >
            {children}
        </StudentsContext.Provider>
    );
};

export const useStudents = () => {
    const context = useContext(StudentsContext);

    if (!context) {
        throw new Error('contexto useStudents foi usado fora do provider');
    }

    return context;
};
