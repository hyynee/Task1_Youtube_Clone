import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
    const { user } = useSelector((state) => state.auth);
    console.log("user", user)
    // Hàm lấy thông tin video
    const getVideoById = async () => {
        try {
            const response = await httpNoAuth.get(`/video/${videoId}`);
            const data = response.data;
            setVideo(data);
        } catch (error) {
            console.error('Lỗi khi lấy video:', error);
        }
    };
    // Hàm kiểm tra trạng thái đăng ký
    const checkSubscriptionStatus = async (channelId) => {
        if (!user) return;

        // Kiểm tra nếu người dùng là chủ kênh thì không cần kiểm tra trạng thái đăng ký
        if (user._id === channelId) {
            setIsSubscribed(false);
            return;
        }

        try {
            const response = await http.get(`/subscription/status/${channelId}`);
            setIsSubscribed(response.data.isSubscribed);
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái đăng ký:', error);
            setIsSubscribed(false);
        }
    };
    useEffect(() => {
        getVideoById();
    }, [videoId]);
    useEffect(() => {
        if (video?.data?.uploadedBy?._id) {
            checkSubscriptionStatus(video.data.uploadedBy._id);
        }
    }, [video, user]);

    const handleSubscribe = async (userId) => {
        if (!user) {
            alert('Vui lòng đăng nhập để đăng ký kênh');
            return;
        }
        try {
            const response = await http.post(`/subscription/${userId}`);
            setIsSubscribed(true);
        } catch (error) {
            console.error('Error subscribing:', error);
        }
    };

    const handleUnsubscribe = async (userId) => {
        if (!user) {
            alert('Vui lòng đăng nhập để hủy đăng ký kênh');
            return;
        }
        try {
            const response = await http.post(`/subscription/unfollow/${userId}`);
            setIsSubscribed(false);
        } catch (error) {
            console.error('Error unsubscribing:', error);
        }
    }

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
                        lang="en"
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
                    {user && (
                        <button
                            className={`ml-auto px-4 py-2 rounded-lg font-semibold text-white ${isSubscribed ? 'bg-gray-400 hover:bg-gray-500' : 'bg-red-500 hover:bg-red-600'}`}
                            onClick={
                                isSubscribed
                                    ? () => handleUnsubscribe(video?.data?.uploadedBy?._id)
                                    : () => handleSubscribe(video?.data?.uploadedBy?._id)
                            }
                        >
                            {isSubscribed ? 'Un Subscribe' : 'Subscribe'}
                        </button>
                    )}
                </div>
                <hr className="my-4" />
                <div className="description">
                    <p className="text-sm text-gray-700">
                        {video?.data?.description || 'No description available'}
                    </p>
                </div>

                {/* Comments Section */}
                <Comments />
            </div>

            {/* Related Videos Section */}
            <RelatedVideo videoId={videoId} />
        </div>
    )
}

export default PlayVideo;