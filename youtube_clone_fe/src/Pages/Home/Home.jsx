import React from 'react'
import Feed from '../../Components/Feed/Feed'
import Sidebar from '../../Components/Sidebar/Sidebar'

const Home = () => {
    return (
        <div className="home flex">
            <Sidebar />
            <div className="feed-container flex-1 p-4">
                <Feed />
            </div>
        </div>
    )
}

export default Home