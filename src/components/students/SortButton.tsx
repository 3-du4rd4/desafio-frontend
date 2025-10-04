'use client';

import React, { useState } from 'react';
import Button from '@/components/layout/Button';
import { useStudents } from '@/contexts/StudentsContext';

import { ChevronDown, ChevronUp } from 'lucide-react';

const SortButton = () => {
    const { sortByNewest, sortByOldest } = useStudents();
    const [isNewest, setIsNewest] = useState(true);

    const handleToggleOrder = () => {
        setIsNewest(!isNewest);

        if (isNewest) sortByOldest();
        else sortByNewest();
    };

    return (
        <Button 
            iconPosition="right" 
            onClick={handleToggleOrder} 
            title={isNewest ? 'Newest' : 'Oldest'}
            icon={isNewest ? <ChevronDown size={16} strokeWidth={3} /> : <ChevronUp size={16} strokeWidth={3} />}
        />
    );
};

export default SortButton;
