import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dislike from '../../assets/dislike.png'
import jack from '../../assets/jack.png'
import like from '../../assets/like.png'
import save from '../../assets/save.png'
import share from '../../assets/share.png'
import { http, httpNoAuth } from '../../util/config'
import Comments from './Comments'
import RelatedVideo from './RelatedVideo'

const PlayVideo = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const getVideoById = async () => {
        const response = await httpNoAuth.get(`/video/${videoId}`)
        const data = await response.data;
        setVideo(data);
    };
    useEffect(() => {
        getVideoById();
    }, [videoId]);
    const handleSubscribe = async (userId) => {
        try {
            const response = await http.post(`/subscription/${userId}`);
            setIsSubscribed(true);
        } catch (error) {
            console.error('Error subscribing:', error);
        }
    };

    return (
        <div className="play-video-container flex flex-col lg:flex-row gap-6 p-4">
            {/* Main Video Section */}
            <div className="video-section flex-1">
                <div className="video-wrapper w-full aspect-video bg-black rounded-lg overflow-hidden shadow-md">
                    <video
                        src={video?.data?.videoUrl}
                        controls
                        autoPlay
                        muted
                        className="w-full h-full object-contain"
                    ></video>
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                    {video?.data?.title}
                </h3>
                <div className="video-info mt-2 text-sm text-gray-600 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <p>{video?.data?.views} - {new Date(video?.data?.createdAt).toLocaleDateString()}</p>
                    <div className="flex items-center gap-4 mt-2 lg:mt-0">
                        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
                            <img src={like} alt="Like" className="w-5 h-5" /> 125
                        </button>
                        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
                            <img src={dislike} alt="Dislike" className="w-5 h-5" /> 2
                        </button>
                        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
                            <img src={share} alt="Share" className="w-5 h-5" /> Share
                        </button>
                        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
                            <img src={save} alt="Save" className="w-5 h-5" /> Save
                        </button>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="publisher flex items-center gap-4">
                    <img
                        src={video?.data?.uploadedBy?.avatar || jack}
                        alt="Publisher"
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">{video?.data?.uploadedBy?.name}</p>
                        <span className="text-sm text-gray-500">500k Subscribers</span>
                    </div>
                    <button
                        className={`ml-auto px-4 py-2 rounded-lg font-semibold text-white ${isSubscribed ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                            }`}
                        onClick={!isSubscribed ? () => handleSubscribe(video?.data?.uploadedBy?._id) : null}
                        disabled={isSubscribed}
                    >
                        {isSubscribed ? 'Đã đăng ký' : 'Subscribe'}
                    </button>
                </div>
                <hr className="my-4" />
                <div className="description">
                    <p className="text-sm text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                        accusantium, cumque, odit, voluptatibus voluptas hic
                        reprehenderit doloremque aperiam facilis nobis quisquam
                        consequatur rerum. Quod, voluptatibus!
                    </p>
                </div>

                {/* Comments Section */}
                <Comments />
            </div>

            {/* Related Videos Section */}
            <RelatedVideo />
        </div>
    )
}

export default PlayVideo;