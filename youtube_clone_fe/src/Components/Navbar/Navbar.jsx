import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import profile_icon from '../../assets/jack.png'
import logo from '../../assets/logo.png'
import menu_icon from '../../assets/menu.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import { logout } from '../../redux/Slides/authReducer'
const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/');
    };
    return (
        <>
            <nav className='flex items-center p-3 justify-between top-0 sticky z-10 bg-white shadow-md'>
                {/* left */}
                <div className='left flex items-center space-x-4'>
                    <img src={menu_icon} alt="Menu" className='w-8 h-8 cursor-pointer hover:opacity-80' />
                    <img src={logo} alt="Logo" className='w-28 cursor-pointer'
                        onClick={() => navigate('/')}
                    />
                </div>

                {/* middle */}
                <div className='middle flex items-center flex-1 justify-center'>
                    <div className='flex w-full max-w-lg bg-gray-100 rounded-full shadow-sm'>
                        <input
                            type="text"
                            placeholder='Search'
                            className='flex-1 px-4 py-2 bg-transparent border-none rounded-l-full focus:outline-none text-sm'
                        />
                        <button className='px-4 py-2 bg-gray-200 rounded-r-full hover:bg-gray-300'>
                            <img src={search_icon} alt="Search" className='w-5 h-5' />
                        </button>
                    </div>
                </div>

                {/* right */}
                <div className='right flex items-center space-x-6'>
                    {user && (
                        <img
                            src={upload_icon}
                            alt="Upload"
                            className='w-6 h-6 cursor-pointer hover:opacity-80'
                            onClick={() => navigate('/upload')}
                        />
                    )}
                    <img src={more_icon} alt="More" className='w-6 h-6 cursor-pointer hover:opacity-80' />
                    <img src={notification_icon} alt="Notifications" className='w-6 h-6 cursor-pointer hover:opacity-80' />

                    <div className="relative group">
                        <img
                            src={profile_icon}
                            alt="Profile"
                            className='w-8 h-8 rounded-full cursor-pointer hover:opacity-80'
                            onClick={() => !user && navigate('/login')}
                        />

                        {user && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-all duration-200 transform group-hover:translate-y-0 translate-y-1
                ">
                                <button
                                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                    onClick={() => navigate('/profile')}
                                >
                                    Profile
                                </button>
                                <button
                                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
