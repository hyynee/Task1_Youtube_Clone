import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../util/config';

const VideoUploadForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        videoUrl: '', //  URL 
    });
    const [videoFile, setVideoFile] = useState(null); // Lưu file video
    const [videoPreview, setVideoPreview] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file); // Lưu file video
            setVideoPreview(URL.createObjectURL(file)); // Hiển thị preview video
        }
    };

    const handleVideoUpload = async () => {
        if (!videoFile) {
            setMessage('Vui lòng chọn một tệp video.');
            return;
        }

        const uploadData = new FormData();
        uploadData.append('video', videoFile);

        try {
            setUploading(true);
            const response = await http.post('/upload/video', uploadData);
            setFormData((prev) => ({
                ...prev,
                videoUrl: response.data.videoUrl, //  URL 
            }));
            setMessage('Tải lên video thành công!');
        } catch (error) {
            console.error(error);
            setMessage('Đã xảy ra lỗi khi tải lên video.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        if (!formData.videoUrl) {
            setMessage('Vui lòng tải lên video trước khi lưu.');
            return;
        }
        setLoading(true);
        try {
            const response = await http.post('/video/create', formData);
            console.log(response);
            setMessage('Lưu thông tin video thành công!');
            if (response.data.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            setMessage('Đã xảy ra lỗi khi lưu thông tin video.');
        } finally {
            setLoading(false);

        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Tải lên Video</h2>

                {message && (
                    <div className={`text-center mb-4 ${message.includes('thành công') ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="block text-sm font-medium text-gray-700 w-full md:w-1/4">Tiêu đề</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập tiêu đề video"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="block text-sm font-medium text-gray-700 w-full md:w-1/4">Mô tả</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập mô tả video"
                            rows="4"
                        />
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="block text-sm font-medium text-gray-700 w-full md:w-1/4">Thời lượng (giây)</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập thời lượng video"
                        />
                    </div>

                    {/* File upload */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="block text-sm font-medium text-gray-700 w-full md:w-1/4">Chọn tệp video</label>
                        <input
                            type="file"
                            name="video"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Video preview */}
                    {videoPreview && (
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Xem trước video:</p>
                            <div className="aspect-video w-full overflow-hidden rounded-lg shadow-md">
                                <video
                                    src={videoPreview}
                                    controls
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    )}

                    {/* Upload Button */}
                    <button
                        type="button"
                        onClick={handleVideoUpload}
                        className={`w-full py-2 rounded-lg font-semibold text-white ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={uploading}
                    >
                        {uploading ? 'Đang tải lên...' : 'Tải lên Video'}
                    </button>

                    {/* Submit */}
                    <button
                        type="submit"
                        className={`w-full py-2 rounded-lg font-semibold text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                        disabled={loading}
                    >
                        {loading ? 'Đang lưu...' : 'Lưu Thông Tin'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VideoUploadForm;
