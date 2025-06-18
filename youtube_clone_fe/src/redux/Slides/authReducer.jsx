import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStorageJSON, http, httpNoAuth, saveStorageJSON } from '../../util/config';

const userFromStorage = getStorageJSON('userInfo') || null;

const initialState = {
    user: userFromStorage ? userFromStorage.user : null,
    token: userFromStorage ? userFromStorage.token : null,
    loading: false,
    error: null,
};

// Hàm để upload avatar trước khi đăng ký
export const uploadAvatar = createAsyncThunk(
    'auth/uploadAvatar',
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await http.post('/upload/public', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload avatar response:', response.data);
            return response.data.imageUrl;
        } catch (error) {
            console.error('Avatar upload error:', error);
            return rejectWithValue(error.response?.data?.message || 'Không thể tải lên avatar');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await http.post('/auth/login', userData);
            const data = response.data;
            // Lưu thông tin user và token vào sessionStorage
            saveStorageJSON('userInfo', data);
            saveStorageJSON('token', data.token);
            return data;
        } catch (error) {
            console.log("error", error)
            return rejectWithValue(
                error.response?.data?.message ||
                (error.response?.data?.statusCode === 400 ? 'Thông tin đăng nhập không chính xác' : 'Lỗi đăng nhập')
            );
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { dispatch, rejectWithValue }) => {
        try {
            let avatarUrl = null;
            // Nếu có file avatar, upload trước
            if (userData.avatar && userData.avatar instanceof File) {
                console.log('Uploading avatar before registration');
                const result = await dispatch(uploadAvatar(userData.avatar)).unwrap();
                avatarUrl = result;
                console.log('Avatar uploaded successfully:', avatarUrl);
            }
            const registerData = {
                email: userData.email,
                password: userData.password,
                name: userData.name,
                avatar: avatarUrl || userData.avatar
            };
            console.log('Registration data:', { ...registerData, password: '***HIDDEN***' });
            const response = await httpNoAuth.post('/auth/register', registerData);
            const data = response.data;
            saveStorageJSON('userInfo', data);
            saveStorageJSON('token', data.token);
            http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            return data;
        } catch (error) {
            console.error('Registration error:', error.response?.data || error);
            return rejectWithValue(
                error.response?.data?.message ||
                (error.response?.data?.statusCode === 400 ? 'Email đã tồn tại' : 'Lỗi đăng ký')
            );
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;

            if (!token) {
                return rejectWithValue('Không có token');
            }
            http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await http.get('/auth/currentUser');
            return response.data;
        } catch (error) {
            console.error('Fetch current user error:', error);
            if (error.response?.status === 401) {
                // Token không hợp lệ hoặc hết hạn
                localStorage.removeItem('userInfo');
                localStorage.removeItem('token');
            }
            return rejectWithValue(error.response?.data?.message || 'Không thể lấy thông tin người dùng');
        }
    }
);

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (userData, { getState, rejectWithValue }) => {
        try {
            const response = await http.put(`/auth/update`, userData);
            return response.data;
        }
        catch (error) {
            console.error('Update user error:', error);
            return rejectWithValue(
                error.response?.data?.message ||
                (error.response?.data?.statusCode === 400 ? 'Thông tin không hợp lệ' : 'Lỗi cập nhật thông tin')
            );
        }
    }
);
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            sessionStorage.removeItem('userInfo');
            sessionStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // loginUser
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // registerUser
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // fetchCurrentUser
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.loading = false;
                if (action.payload === 'Không có token' || action.error.message.includes('401')) {
                    state.user = null;
                    state.token = null;
                    sessionStorage.removeItem('userInfo');
                    sessionStorage.removeItem('token');
                }
            })
            // updateUser
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;