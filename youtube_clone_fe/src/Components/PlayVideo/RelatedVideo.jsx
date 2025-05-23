import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { http } from '../../util/config'

const RelatedVideo = () => {
    const relatedVideos = [1, 2, 3, 4]
    const [videos, setVideo] = useState(null)
    const getAllVideo = async () => {
        try {
            const response = await http.get('/video/get-all')
            const data = response.data
            setVideo(data);
        } catch (error) {
            console.error('Error fetching videos:', error)
        }
    };
    useEffect(() => {
        getAllVideo();
    }, []);
    console.log(videos);
    if (!videos) {
        return <div>Loading...</div>
    }
    return (
        <div className="related-videos w-full lg:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Related Videos</h4>
            <div className="video-list space-y-4">
                {videos.map((video) => (
                    <NavLink to={`/video/${video._id}`} key={video._id}>
                        <div
                            className="related-video flex gap-4 items-start"
                        >
                            <div className="w-1/3 aspect-video bg-black rounded-lg overflow-hidden">
                                <video
                                    src={video?.videoUrl}
                                    controls
                                    muted
                                    className="w-full h-full object-cover"
                                ></video>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm line-clamp-2">
                                    {video.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {video?.uploadedBy?.name || 'Unknown Channel'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {video.views || '0'} views • {new Date(video.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
export default RelatedVideo;