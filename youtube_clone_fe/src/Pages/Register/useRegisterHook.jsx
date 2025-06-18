import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearError, registerUser } from '../../redux/Slides/authReducer';

export const useRegisterHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const [errors, setErrors] = useState({});
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        avatar: null
    });

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                avatar: file
            }));
            setAvatarPreview(URL.createObjectURL(file));
        }
    };
    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[a-zA-Z\s]+$/;
        const maxNameLength = 50;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length > maxNameLength) {
            newErrors.name = `Name must not exceed ${maxNameLength} characters`;
        } else if (!nameRegex.test(formData.name)) {
            newErrors.name = 'Name contains invalid characters';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (formData.password !== formData.confirmPassword) {
            dispatch(clearError());
            return;
        }
        const userData = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            avatar: formData.avatar
        };
        const result = await dispatch(registerUser(userData));
        if (registerUser.fulfilled.match(result)) {
            navigate('/');
        }
    };

    return {
        formData,
        loading,
        error,
        handleInputChange,
        handleFileChange,
        handleSubmit,
        avatarPreview,
        errors
    };
};