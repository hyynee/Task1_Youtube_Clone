import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/video/:videoId" element={<Video />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<VideoUploadForm />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </Provider>
  )
}

export default App