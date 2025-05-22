import React from 'react';
import { useProfileHook } from './useProfileHook';
const EditProfile = () => {
    const {
        formData,
        loading,
        handleFileChange,
        handleSubmit,
        handleInputChange,
        user,
        navigate
    } = useProfileHook();

    return (
        <div className="edit-profile-container min-h-screen bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto"
            >
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Avatar
                    </label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        accept="image/*"
                    />
                </div>
                <div className="mb-4">
                    <img
                        src={formData.filePreview || user?.avatar || 'https://via.placeholder.com/150'}
                        alt="Avatar Preview"
                        className="w-24 h-24 rounded-full object-cover mx-auto"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => navigate('/profile')}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;