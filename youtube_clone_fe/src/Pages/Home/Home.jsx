import React, { useState } from 'react'
import Feed from '../../Components/Feed/Feed'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="home flex flex-col min-h-screen bg-gray-50">
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex flex-1">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="feed-container flex-1 p-4 lg:ml-64">
                    <div className="max-w-7xl mx-auto">
                        <Feed />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home