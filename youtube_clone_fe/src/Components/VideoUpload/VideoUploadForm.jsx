import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../util/config';

const VideoUploadForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        videoUrl: '', // Video URL
    });
    const [videoFile, setVideoFile] = useState(null); // Store video file
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
            setVideoFile(file); // Store video file
            setVideoPreview(URL.createObjectURL(file)); // Display video preview
        }
    };

    const handleVideoUpload = async () => {
        if (!videoFile) {
            setMessage('Please select a video file.');
            return;
        }
        const uploadData = new FormData();
        uploadData.append('video', videoFile);
        try {
            setUploading(true);
            const response = await http.post('/upload/video', uploadData);
            setFormData((prev) => ({
                ...prev,
                videoUrl: response.data.videoUrl, // Video URL
            }));
            setMessage('Video uploaded successfully!');
        } catch (error) {
            console.error(error);
            setMessage('An error occurred while uploading the video.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        if (!formData.title.trim()) {
            setMessage('Title is required.');
            return;
        }
        if (!formData.description.trim()) {
            setMessage('Description is required.');
            return;
        }
        if (!formData.duration) {
            setMessage('Duration is required.');
            return;
        }
        // Validation for duration
        const duration = parseInt(formData.duration, 10);
        if (isNaN(duration) || duration <= 0) {
            setMessage('Duration must be a positive number.');
            return;
        }
        if (duration > 99999) {
            setMessage('Duration exceeds the maximum allowed value.');
            return;
        }
        if (!formData.videoUrl) {
            setMessage('Please upload a video before saving.');
            return;
        }
        setLoading(true);
        try {
            const response = await http.post('/video/create', formData);
            console.log(response);
            setMessage('Video information saved successfully!');
            if (response.data.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred while saving the video information.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Upload Video</h2>

                {message && (
                    <div className={`text-center mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="block text-sm font-medium text-gray-700 w-full md:w-1/4">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter video title"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="block text-sm font-medium text-gray-700 w-full md:w-1/4">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter video description"
                            rows="4"
                        />
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="block text-sm font-medium text-gray-700 w-full md:w-1/4">Duration (seconds)</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter video duration"
                        />
                    </div>

                    {/* File upload */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <label className="block text-sm font-medium text-gray-700 w-full md:w-1/4">Select video file</label>
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
                            <p className="text-sm font-medium text-gray-700 mb-2">Video Preview:</p>
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
                        {uploading ? 'Uploading...' : 'Upload Video'}
                    </button>

                    {/* Submit */}
                    <button
                        type="submit"
                        className={`w-full py-2 rounded-lg font-semibold text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Video Information'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VideoUploadForm;
