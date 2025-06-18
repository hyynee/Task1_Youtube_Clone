import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { httpNoAuth } from '../../util/config';

const Feed = () => {
    const [videos, setVideos] = useState([]);
    const getAllVideos = async () => {
        const response = await httpNoAuth.get('http://localhost:8080/video/get-all')
        const data = await response.data;
        setVideos(data);
    };
    useEffect(() => {
        getAllVideos();
    }, [])
    return (
        <div className="feed p-4 flex flex-wrap gap-6">
            {videos.map((video) => (
                <div
                    key={video._id}
                    className="video-card w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-white rounded-lg shadow-md overflow-hidden"
                >
                    <NavLink to={`/video/${video._id}`}>
                        <video
                            src={video.videoUrl}
                            alt={video.title}
                            className="w-full h-48 object-cover"
                            lang='en'
                        />
                        <div className="p-4">
                            <h3 className="text-sm font-semibold line-clamp-2">
                                {video.title.length > 100 ? `${video.title.slice(0, 100)}...` : video.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-2">
                                {video.channel}
                            </p>
                            <p className="text-xs text-gray-500">
                                {video.views} • {video.duration}
                            </p>
                            <p className="text-xs text-gray-500">
                                {new Date(video.createdAt).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                                {video?.uploadedBy?.email}
                            </p>
                        </div>
                    </NavLink>
                </div>
            ))}
        </div>
    )
}

export default Feed