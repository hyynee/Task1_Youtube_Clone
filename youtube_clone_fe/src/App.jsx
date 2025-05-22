import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import EditProfile from './Components/Profile/EditProfile';
import Profile from './Components/Profile/Profile';
import VideoUploadForm from './Components/VideoUpload/VideoUploadForm';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Video from './Pages/Video/Video';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:videoId" element={<Video />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<VideoUploadForm />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
    </Provider>
  )
}

export default App