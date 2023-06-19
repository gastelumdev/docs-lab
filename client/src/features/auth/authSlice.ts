import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getSession, getUser, login, logout, register } from './authAPI';
import { TSignin, TUser } from '../types/auth';
import { TypedUseSelectorHook } from 'react-redux';
import { ErrorResponse } from '@remix-run/router';

interface TAuthState {
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'failed';
    accessToken: string;
    userId: string | null;
    user: TUser;
}

const initialState: TAuthState = {
    isAuthenticated: false,
    accessToken: "",
    status: 'loading',
    userId: null,
    user: {username: "", email: "", password: "", role: "", siteId: ""}
}


export const loginAsync = createAsyncThunk(
    'auth/signin', 
    async ({email, password}: TSignin, thunkAPI) => {
        try {
            const response = await login({email, password});
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userId', response.data.user.id);
            console.log(response.data);
            return response.data;
        } catch (err) {
            const errors = err as Error | AxiosError;
            return thunkAPI.rejectWithValue({error: errors.message});
        }
    }
);

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (user: TUser, thunkAPI) => {
        try {
            const regResponse: any = await register(user);
            if (regResponse.data.successful) {
                const response = await login({email: user.email, password: user.password});
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('userId', response.data.user.id);
                console.log(response.data);
                return response.data;
            }
            
            
        } catch (err) {
            const errors = err as Error | AxiosError;
            console.log(errors);
            return thunkAPI.rejectWithValue({error: errors.message});
        }
    }
)

export const getUserAsync = createAsyncThunk(
    'auth/user',
    async () => {
        try {
            if (localStorage.getItem("token")) {
                const response = await getUser();
                return response.data;
            }
        } catch (err) {
            const error = err as Error | AxiosError;
            console.log(error);
            // return thunkAPI.rejectWithValue({error: error.message});
        }
    }
)

export const getSessionAsync = createAsyncThunk(
    'auth/session',
    async () => {
        try {
            if (localStorage.getItem("token")) {
                const response = await getSession();
                return response.data;
            }

            return false;
            
        } catch (err) {
            const error = err as Error | AxiosError;
            console.log(error);
            // return thunkAPI.rejectWithValue({error: error.message});
        }
    }
)

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            const response = await logout();
            
            // localStorage.setItem("token", "");
            // localStorage.setItem("userId", "");
            return response.data;
            
        } catch (err) {
            const error = err as Error | AxiosError;
            console.log(error);
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loginAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = action.payload.user.isAuthenticated;
        })
        .addCase(loginAsync.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(registerAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(registerAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = action.payload.user.isAuthenticated;
        })
        .addCase(registerAsync.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(getUserAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.user = action.payload;
        })
        .addCase(getUserAsync.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(getSessionAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getSessionAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.isAuthenticated = action.payload;
        })
        .addCase(getSessionAsync.rejected, (state) => {
            state.status = 'failed';
            state.isAuthenticated = false;
        })
        .addCase(logoutAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(logoutAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
        })
        .addCase(logoutAsync.rejected, (state) => {
            state.status = 'failed';
        })
    }
});

export const selectUserId = (state: RootState) => state.auth.userId;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;

