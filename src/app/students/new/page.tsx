'use client';

import * as z from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import Header from '@/components/layout/Header';
import { zodResolver } from '@hookform/resolvers/zod';
import FormSection from '@/components/layout/FormSection';
import { StudentsProvider } from '@/contexts/StudentsContext';

const studentSchema = z.object({
    firstName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    lastName: z.string().min(3, 'Sobrenome deve ter pelo menos 3 caracteres'),
    email: z.string().refine((str) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(str);
    }, 'E-mail inválido'),
    phone: z.string().min(8, 'Telefone inválido'),
    dateOfBirth: z.string().nonempty('Data obrigatória'),
    address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
    parentName: z.string().min(3, 'Nome do responsável deve ter pelo menos 3 caracteres'),
    placeOfBirth: z.string().min(3, 'Local de nascimento deve ter pelo menos 3 caracteres'),

    parentFirstName: z.string().min(3, 'Nome do responsável deve ter pelo menos 3 caracteres'),
    parentLastName: z.string().min(3, 'Sobrenome do responsável deve ter pelo menos 3 caracteres'),
    parentEmail: z.string().refine((str) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(str);
    }, 'E-mail inválido'),
    parentPhone: z.string().min(8, 'Telefone inválido'),
    parentAddress: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
    payments: z.enum(['Cash', 'Debit']),
});

type StudentFormData = z.infer<typeof studentSchema>;

export default function AddStudentPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<StudentFormData>({
        resolver: zodResolver(studentSchema),
    });

    const onSubmit = (data: StudentFormData) => {
     console.log('Formulário válido:', data);
    };

    return (
        <StudentsProvider>
            <div className="flex flex-col gap-6">
                <Header title="Add New Student" />

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                    <FormSection
                        title="Student Details"
                        register={register}
                        errors={errors}
                        fields={[
                            { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Samantha', required: true },
                            { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'William', required: true },
                            { label: 'Date & Place of Birth', required: true, type: 'group',
                                fields: [
                                { name: 'dateOfBirth', type: 'date', required: true },
                                { name: 'placeOfBirth', type: 'text', placeholder: 'Jakarta', required: true },
                                ],
                            },
                            { label: 'Parent Name', name: 'parentName', type: 'text', placeholder: 'John Doe', required: true },
                            { label: 'Email', name: 'email', type: 'email', placeholder: 't7PpM@example.com', required: true },
                            { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(11) 91234-5678', required: true },
                            { label: 'Address', name: 'address', type: 'textarea', placeholder: 'Rua das Flores, 123', required: true },
                        ]}
                    />

                    <FormSection
                        title="Parent Details"
                        register={register}
                        errors={errors}
                        fields={[
                            { label: 'First Name', name: 'parentFirstName', type: 'text', placeholder: 'Samantha', required: true },
                            { label: 'Last Name', name: 'parentLastName', type: 'text', placeholder: 'William', required: true },
                            { label: 'Email', name: 'parentEmail', type: 'email', placeholder: 't7PpM@example.com', required: true },
                            { label: 'Phone', name: 'parentPhone', type: 'tel', placeholder: '(11) 91234-5678', required: true },
                            { label: 'Address', name: 'parentAddress', type: 'textarea', placeholder: 'Rua das Flores, 123', required: true },
                            { label: 'Payments', name: 'payments', type: 'radio', options: ['Cash', 'Debit'], required: true },
                        ]}
                    />

                    <button
                        type="submit"
                        className="self-end bg-[#4D44B5] text-white px-6 py-2 rounded-md hover:bg-[#3a3691] transition"
                    >
                        Save
                    </button>
                </form>
            </div>
        </StudentsProvider>
    );
}
