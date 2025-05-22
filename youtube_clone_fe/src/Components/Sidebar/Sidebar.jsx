import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import automobiles from '../../assets/automobiles.png'
import blogs from '../../assets/blogs.png'
import entertaiment from '../../assets/entertainment.png'
import game_icon from '../../assets/game_icon.png'
import home from '../../assets/home.png'
import music from '../../assets/music.png'
import news from '../../assets/news.png'
import sports from '../../assets/sports.png'
import tech from '../../assets/tech.png'
import { http } from '../../util/config'

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const [subscribeList, setSubscribeList] = useState([]);
    const getSubscribeList = async () => {
        try {
            const response = await http.get('/subscription/getAllSubscriptions');
            const data = await response.data;
            setSubscribeList(data);
        } catch (error) {
            console.error(error);
        };
        console.log(subscribeList);
    }
    useEffect(() => {
        if (user) {
            getSubscribeList();
        }
    }, [user]);
    return (
        <div className='sidebar bg-white shadow-md sticky top-0 p-4 flex flex-col space-y-6 lg:w-64 w-20'>
            {/* Shortcut Links */}
            <div className="shortcut-links flex flex-col space-y-4">
                <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <img src={home} alt="Home" className='w-6 h-6' />
                    <p className='hidden lg:block text-sm font-medium'>Home</p>
                </div>
                <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <img src={game_icon} alt="Gaming" className='w-6 h-6' />
                    <p className='hidden lg:block text-sm font-medium'>Gaming</p>
                </div>
                <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <img src={automobiles} alt="Automobiles" className='w-6 h-6' />
                    <p className='hidden lg:block text-sm font-medium'>Automobiles</p>
                </div>
                <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <img src={sports} alt="Sports" className='w-6 h-6' />
                    <p className='hidden lg:block text-sm font-medium'>Sports</p>
                </div>
                <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <img src={entertaiment} alt="Entertainment" className='w-6 h-6' />
                    <p className='hidden lg:block text-sm font-medium'>Entertainment</p>
                </div>
                <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <img src={tech} alt="Technology" className='w-6 h-6' />
                    <p className='hidden lg:block text-sm font-medium'>Technology</p>
                </div>
                <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <img src={music} alt="Music" className='w-6 h-6' />
                    <p className='hidden lg:block text-sm font-medium'>Music</p>
                </div>
                <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <img src={blogs} alt="Blogs" className='w-6 h-6' />
                    <p className='hidden lg:block text-sm font-medium'>Blogs</p>
                </div>
                <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <img src={news} alt="News" className='w-6 h-6' />
                    <p className='hidden lg:block text-sm font-medium'>News</p>
                </div>
            </div>

            {/* Subscribed List */}
            {user && (
                <div className='subscribed-list'>
                    <h3 className='hidden lg:block text-sm font-semibold text-gray-600 mb-2'>Subscribe</h3>
                    {subscribeList.map((subscription) => (
                        <div
                            key={subscription._id}
                            className='side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'
                        >
                            <img
                                src={subscription.subscribedTo.avatar}
                                alt={subscription.subscribedTo.name}
                                className='w-8 h-8 rounded-full'
                            />
                            <p className='hidden lg:block text-sm font-medium'>
                                {subscription.subscribedTo.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Sidebar