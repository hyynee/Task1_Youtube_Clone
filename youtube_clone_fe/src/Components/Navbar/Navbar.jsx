import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import menu_icon from '../../assets/menu.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import { logout } from '../../redux/Slides/authReducer';

const Navbar = ({ toggleSidebar }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    console.log('user in navbar:', user);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-10">
            {/* Left section - menu and logo */}
            <div className="flex items-center space-x-3">
                <img
                    src={menu_icon}
                    alt="Menu"
                    className="w-6 h-6 cursor-pointer hover:opacity-80"
                    onClick={toggleSidebar}
                />
                <img
                    src={logo}
                    alt="Logo"
                    className="w-24 cursor-pointer"
                    onClick={() => navigate('/')}
                />
            </div>

            {/* Middle section - search bar */}
            <div className="flex-1 mx-4 max-w-lg hidden md:flex items-center">
                <div className="flex w-full bg-gray-100 rounded-full shadow-sm overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex-1 px-4 py-2 bg-transparent border-none focus:outline-none text-sm text-gray-700"
                    />
                    <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors">
                        <img src={search_icon} alt="Search" className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Right section - navigation icons */}
            <div className="flex items-center space-x-4">
                {user && (
                    <img
                        src={upload_icon}
                        alt="Upload"
                        className="w-6 h-6 cursor-pointer hover:opacity-80"
                        onClick={() => navigate('/upload')}
                    />
                )}
                <img
                    src={more_icon}
                    alt="More"
                    className="w-6 h-6 cursor-pointer hover:opacity-80"
                />
                <img
                    src={notification_icon}
                    alt="Notifications"
                    className="w-6 h-6 cursor-pointer hover:opacity-80"
                />
                <div className="relative group">
                    {user ? (
                        <img
                            src={user.avatar}
                            alt="Profile"
                            className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80"
                        />
                    ) : (
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            onClick={() => navigate('/login')}
                        >
                            Đăng nhập
                        </button>
                    )}
                    {user && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => navigate('/profile')}
                            >
                                Profile
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;