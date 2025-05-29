import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import automobiles from '../../assets/automobiles.png';
import blogs from '../../assets/blogs.png';
import entertainment from '../../assets/entertainment.png';
import game_icon from '../../assets/game_icon.png';
import home from '../../assets/home.png';
import music from '../../assets/music.png';
import news from '../../assets/news.png';
import sports from '../../assets/sports.png';
import tech from '../../assets/tech.png';
import { http } from '../../util/config';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user } = useSelector((state) => state.auth);
    const [subscribeList, setSubscribeList] = useState([]);

    const getSubscribeList = async () => {
        try {
            const response = await http.get('/subscription/getAllSubscriptions');
            setSubscribeList(response.data);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    };

    useEffect(() => {
        if (user) {
            getSubscribeList();
        } else {
            setSubscribeList([]);
        }
    }, [user]);

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden transition-opacity duration-300 ease-in-out opacity-100"
                    onClick={toggleSidebar}
                />
            )}
            <div
                className={`sidebar bg-white shadow-md fixed top-0 left-0 h-full p-4 flex flex-col space-y-6 transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 lg:w-64 w-72 z-20`}
            >
                {/* Toggle button for mobile */}
                <button
                    className="lg:hidden mb-4 self-end"
                    onClick={toggleSidebar}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Shortcut Links */}
                <div className="shortcut-links flex flex-col space-y-4">
                    <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                        <NavLink to="/" className="flex items-center space-x-4">
                            <img src={home} alt="Home" className="w-6 h-6" />
                            <p className={`${isOpen ? 'block' : 'hidden'} lg:block text-sm font-medium text-gray-700`}>Home</p>
                        </NavLink>
                    </div>
                    <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                        <img src={game_icon} alt="Gaming" className="w-6 h-6" />
                        <p className={`${isOpen ? 'block' : 'hidden'} lg:block text-sm font-medium text-gray-700`}>Gaming</p>
                    </div>
                    <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                        <img src={automobiles} alt="Automobiles" className="w-6 h-6" />
                        <p className={`${isOpen ? 'block' : 'hidden'} lg:block text-sm font-medium text-gray-700`}>Automobiles</p>
                    </div>
                    <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                        <img src={sports} alt="Sports" className="w-6 h-6" />
                        <p className={`${isOpen ? 'block' : 'hidden'} lg:block text-sm font-medium text-gray-700`}>Sports</p>
                    </div>
                    <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                        <img src={entertainment} alt="Entertainment" className="w-6 h-6" />
                        <p className={`${isOpen ? 'block' : 'hidden'} lg:block text-sm font-medium text-gray-700`}>Entertainment</p>
                    </div>
                    <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                        <img src={tech} alt="Technology" className="w-6 h-6" />
                        <p className={`${isOpen ? 'block' : 'hidden'} lg:block text-sm font-medium text-gray-700`}>Technology</p>
                    </div>
                    <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                        <img src={music} alt="Music" className="w-6 h-6" />
                        <p className={`${isOpen ? 'block' : 'hidden'} lg:block text-sm font-medium text-gray-700`}>Music</p>
                    </div>
                    <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                        <img src={blogs} alt="Blogs" className="w-6 h-6" />
                        <p className={`${isOpen ? 'block' : 'hidden'} lg:block text-sm font-medium text-gray-700`}>Blogs</p>
                    </div>
                    <div className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                        <img src={news} alt="News" className="w-6 h-6" />
                        <p className={`${isOpen ? 'block' : 'hidden'} lg:block text-sm font-medium text-gray-700`}>News</p>
                    </div>
                </div>

                {/* Subscribed List */}
                {user && (
                    <div className="subscribed-list">
                        <h3 className={`${isOpen ? 'block' : 'hidden'} lg:block text-sm font-semibold text-gray-600 mb-2`}>Subscribe</h3>
                        {subscribeList.map((subscription) => (
                            <div
                                key={subscription._id}
                                className="side-link flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
                            >
                                <img
                                    src={subscription.subscribedTo.avatar}
                                    alt={subscription.subscribedTo.name}
                                    className="w-8 h-8 rounded-full"
                                />
                                <p className={`${isOpen ? 'block' : 'hidden'} lg:block text-sm font-medium text-gray-700`}>
                                    {subscription.subscribedTo.name}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Sidebar;