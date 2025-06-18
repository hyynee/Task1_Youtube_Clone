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
            // Check file type
            if (!file.type.startsWith('image/')) {
                alert('Định dạng file không hợp lệ.');
                e.target.value = '';
                return;
            }

            // Check file size (5MB = 5 * 1024 * 1024 bytes)
            if (file.size > 5 * 1024 * 1024) {
                alert('Kích thước file quá lớn.');
                e.target.value = '';
                return;
            }

            setFormData((prev) => ({
                ...prev,
                avatar: file,
                filePreview: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const specialCharRegex = /[^a-zA-Z0-9\s]/;
        if (specialCharRegex.test(formData.name)) {
            alert('Tên không được chứa ký tự đặc biệt.');
            setLoading(false);
            return;
        }
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