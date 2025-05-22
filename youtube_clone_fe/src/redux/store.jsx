import { configureStore } from '@reduxjs/toolkit';
import authSlices from './Slides/authReducer';
export const store = configureStore({
    reducer: {
        auth: authSlices,
    },
});

export default store;