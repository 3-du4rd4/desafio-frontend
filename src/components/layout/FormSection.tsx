import React from 'react';
import { FieldErrors, FieldValues, Path, useForm, UseFormRegister } from 'react-hook-form';

interface SubField {
  name: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  type: 'text' | 'email' | 'select' | 'date' | 'textarea' | 'radio' | 'tel';
}

interface FormField {
  label: string;
  name?: string;
  required?: boolean;
  options?: string[];
  fields?: SubField[];
  placeholder?: string;
  type: 'text' | 'email' | 'select' | 'date' | 'textarea' | 'radio' | 'tel' | 'group';
}

interface FormSectionProps<T extends FieldValues> {
  title: string;
  fields: FormField[];
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
}

const FormSection = <T extends FieldValues>({ title, fields, register, errors }: FormSectionProps<T>) => {
  return (
    <div className="bg-white rounded-2xl shadow">
      <div className="px-6 py-3 bg-[#4D44B5] rounded-t-2xl">
        <h3 className="font-semibold text-lg text-white">{title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {fields.map((field, index) => (
          <div key={`${field.name}-${index}`} className="flex flex-col gap-2">
            <label htmlFor={field.name} className="font-medium text-[#303972]">
              {field.label}{field.required && <span className="ml-2">*</span>}
            </label>

            {field.type === 'group' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {field.fields?.map((subField, subIndex) => (
                  <div key={`${subField.name}-${subIndex}`} className="flex flex-col gap-1">
                    <input
                      {...register(subField.name as unknown as Path<T>)}
                      id={subField.name}
                      type={subField.type || 'text'}
                      placeholder={subField.placeholder}
                      required={subField.required}
                      className="flex-1 border border-[#C1BBEB] p-3 rounded text-[#A098AE] focus:border-[#4D44B5] focus:ring-1 focus:ring-[#4D44B5] focus:outline-none"
                    />
                    {errors[subField.name as keyof T] && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors[subField.name as keyof T]?.message?.toString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : field.type === 'textarea' ? (
              <>
                <textarea
                  {...register(field.name as unknown as Path<T>)}
                  id={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={4}
                  className="border border-[#C1BBEB] p-3 rounded-md text-[#A098AE] resize-none focus:border-[#4D44B5] focus:ring-1 focus:ring-[#4D44B5] focus:outline-none"
                />
                {errors[field.name as keyof T] && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors[field.name as keyof T]?.message?.toString()}
                  </span>
                )}
              </>
            ) : field.type === 'radio' ? (
              <div className="flex gap-4">
                {field.options?.map(option => (
                  <label key={option} className="flex items-center gap-2 text-[#A098AE]">
                    <input
                      {...register(field.name as unknown as Path<T>)}
                      type="radio"
                      id={`${field.name}-${option}`}
                      value={option}
                      required={field.required}
                    />
                    {option}
                  </label>
                ))}
                {errors[field.name as keyof T] && (
                  <span className="text-red-500 text-xs mt-1 col-span-2">
                    {errors[field.name as keyof T]?.message?.toString()}
                  </span>
                )}
              </div>
            ) : (
              <>
                <input
                  {...register(field.name as unknown as Path<T>)}
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="border border-[#C1BBEB] p-3 rounded-md text-[#A098AE] focus:border-[#4D44B5] focus:ring-1 focus:ring-[#4D44B5] focus:outline-none"
                />
                {errors[field.name as keyof T] && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors[field.name as keyof T]?.message?.toString()}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSection;
