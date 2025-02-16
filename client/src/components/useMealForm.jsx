//This is the custom hook page code

import { useState } from 'react';

export const useMealForm = (initialData = {}) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        else if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
        else if (formData.name.length > 20) newErrors.name = 'Name must be under 20 characters';

        if (!formData.totalMinutes) newErrors.totalMinutes = 'Cook time is required';
        else if (formData.totalMinutes < 2) newErrors.totalMinutes = 'Minimum 2 minutes';
        else if (formData.totalMinutes > 240) newErrors.totalMinutes = 'Maximum 240 minutes';

        if (!formData.directions) newErrors.directions = 'Directions are required';
        else if (formData.directions.length < 10) newErrors.directions = 'Directions must be at least 10 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { formData, errors, handleChange, validate };
};