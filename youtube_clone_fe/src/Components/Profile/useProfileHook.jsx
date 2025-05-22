import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser, uploadAvatar } from '../../redux/Slides/authReducer';

export const useProfileHook = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        avatar: user?.avatar || null,
        filePreview: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                avatar: file,
                filePreview: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let avatarUrl = user?.avatar;
            // Nếu có file avatar mới, upload trước
            if (formData.avatar instanceof File) {
                const result = await dispatch(uploadAvatar(formData.avatar)).unwrap();
                avatarUrl = result;
            }
            const updatedData = {
                name: formData.name,
                email: formData.email,
                avatar: avatarUrl,
            };
            await dispatch(updateUser(updatedData)).unwrap();
            navigate('/profile');
        } catch (error) {
            console.error('Update error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return {
        formData,
        loading,
        handleFileChange,
        handleSubmit,
        handleInputChange,
        user,
        navigate
    };
};