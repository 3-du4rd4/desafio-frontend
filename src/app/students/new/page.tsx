'use client';

import * as z from 'zod';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '@/components/layout/Button';
import Header from '@/components/layout/Header';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import FormSection from '@/components/layout/FormSection';
import { Student, useStudents } from '@/contexts/StudentsContext';
import { generateRandomId, getRandomGrade } from '@/utils/students';

const studentSchema = z.object({
    firstName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    lastName: z.string().min(3, 'Sobrenome deve ter pelo menos 3 caracteres'),
    email: z.string().refine((str) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(str);
    }, 'E-mail inválido'),
    phone: z.string().min(8, 'Telefone inválido'),
    dateOfBirth: z.string().nonempty('Data obrigatória'),
    address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres').max(2000, 'Endereço deve ter menos de 2000 caracteres'),
    parentName: z.string().min(3, 'Nome do responsável deve ter pelo menos 3 caracteres'),
    placeOfBirth: z.string().min(3, 'Local de nascimento deve ter pelo menos 3 caracteres'),

    parentFirstName: z.string().min(3, 'Nome do responsável deve ter pelo menos 3 caracteres'),
    parentLastName: z.string().min(3, 'Sobrenome do responsável deve ter pelo menos 3 caracteres'),
    parentEmail: z.string().refine((str) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(str);
    }, 'E-mail inválido'),
    parentPhone: z.string().min(8, 'Telefone inválido'),
    parentAddress: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres').max(2000, 'Endereço deve ter menos de 2000 caracteres'),
    payments: z.enum(['Cash', 'Debit'], 'Selecione uma forma de pagamento'),
});

type StudentFormData = z.infer<typeof studentSchema>;

export default function AddStudentPage() {
    const [draftSaved, setDraftSaved] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, watch, control } = useForm<StudentFormData>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            address: '',
            parentName: '',
            placeOfBirth: '',
            parentFirstName: '',
            parentEmail: '',
            parentPhone: '',
            parentAddress: '',
            payments: 'Cash',
            parentLastName: '',
        } ,
        mode: 'onBlur',
    });

    let props = { value: '' };

    const router = useRouter();
    const draftKey = 'studentDraft';
    const { addStudent } = useStudents();

    useEffect(() => {
        const draft = sessionStorage.getItem(draftKey);

        if (draft) {
            reset(JSON.parse(draft));
        }
    }, [reset]);

    const handleSaveDraft = () => {
        const currentData = watch();

        sessionStorage.setItem(draftKey, JSON.stringify(currentData));
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 1500);
    };

    const onSubmit = (data: StudentFormData) => {
        const newStudent: Student = {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            date: data.dateOfBirth,
            grade: getRandomGrade(),
            parentName: data.parentName,
            city: data.placeOfBirth,
            id: generateRandomId()
        };

        addStudent(newStudent);
        sessionStorage.removeItem(draftKey); 
        toast.success('Estudante salvo com sucesso!');
        router.push('/students');
    };

    return (
        <div className="flex flex-col gap-6">
            <Header title="Add New Student" />

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <FormSection
                    title="Student Details"
                    register={register}
                    errors={errors}
                    watch={watch}
                    control={control}
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
                    watch={watch}
                    control={control}
                    fields={[
                        { label: 'First Name', name: 'parentFirstName', type: 'text', placeholder: 'Samantha', required: true },
                        { label: 'Last Name', name: 'parentLastName', type: 'text', placeholder: 'William', required: true },
                        { label: 'Email', name: 'parentEmail', type: 'email', placeholder: 't7PpM@example.com', required: true },
                        { label: 'Phone', name: 'parentPhone', type: 'tel', placeholder: '(11) 91234-5678', required: true },
                        { label: 'Address', name: 'parentAddress', type: 'textarea', placeholder: 'Rua das Flores, 123', required: true },
                        { label: 'Payments', name: 'payments', type: 'radio', options: ['Cash', 'Debit'], required: true },
                    ]}
                />

                

                <div className='flex items-center justify-end gap-4 flex-wrap'>
                    <div className='relative w-fit'>
                    <Button
                        title="Save as Draft"
                        onClick={handleSaveDraft}
                    />

                    {draftSaved && (
                        <div
                            role="tooltip"
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#4D44B5] text-white text-xs font-medium px-2 py-1 rounded-md shadow-md animate-fade"
                            >
                            Rascunho salvo!
                            <div className="tooltip-arrow"></div>
                        </div>
                    )}
                    </div>

                    <Button
                        title='Submit'
                        isFilled
                        type='submit'
                    />
                </div>
            </form>
        </div>
    );
}
