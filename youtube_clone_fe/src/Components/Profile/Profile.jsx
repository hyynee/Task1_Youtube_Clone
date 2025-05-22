import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { http } from '../../util/config';

const Profile = () => {
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);
    const [video, setVideo] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const getUserVideo = async () => {
        try {
            const response = await http.get(`/video/get-user-videos`);
            const data = await response.data;
            setVideo(data);
        } catch (error) {
            console.error("Error fetching user videos:", error);
        }
    };
    const getAllSubscribers = async () => {
        try {
            const response = await http.get(`/subscription/getAllSubscribers`);
            const data = await response.data;
            setSubscribers(data);
            console.log("Subscribers:", data);
        } catch (error) {
            console.error("Error fetching subscribers:", error);
        }
    };
    useEffect(() => {
        if (user) {
            getUserVideo();
            getAllSubscribers();
        }
    }, [user]);
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }
    if (error) {
        return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
    }
    if (!user) {
        return <div className="flex items-center justify-center min-h-screen">Please log in to view your profile.</div>;
    }

    return (
        <div className="profile-container min-h-screen bg-gray-50 p-4">
            {/* Header Section */}
            <div className="profile-header bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
                <img
                    src={user?.avatar || ""}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="text-gray-500">{subscribers?.length} Người đăng ký kênh</p>
                </div>
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => navigate('/edit-profile')}
                >
                    Edit Profile
                </button>
            </div>

            {/* Tabs Section */}
            <div className="tabs mt-6">
                <ul className="flex border-b">
                    <li className="mr-6">
                        <button className="text-blue-500 border-b-2 border-blue-500 pb-2 font-semibold">
                            Videos
                        </button>
                    </li>
                </ul>
            </div>

            {/* Content Section */}
            <div className="content mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {video.map((video) => (
                    <div
                        key={video._id}
                        className="video-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="relative w-full h-40 bg-black">
                            <video
                                src={video.videoUrl || ""}
                                controls
                                muted
                                className="absolute top-0 left-0 w-full h-full"
                            ></video>
                        </div>
                        <div className="p-4">
                            <h3 className="text-sm font-semibold line-clamp-2">
                                {video.title || "Untitled Video"}
                            </h3>
                            <p className="text-xs text-gray-500 mt-2">
                                {video.views || 0} views • {new Date(video.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;