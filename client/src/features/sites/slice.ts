import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TData} from './types';
import config from './config';
import { createData, deleteData, getData, updateData } from './api';

interface TDataState {
    data: [TData] | [];
    createdData: TData | {};
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TDataState = {
    data: [],
    createdData: {},
    status: 'loading',
}

export const getDataAsync = createAsyncThunk(
    `${config.name}/get`,
    async () => {
        try {
            const response = await getData();
            return response.data;
        } catch (err) {
            const errors = err as Error | AxiosError;
            console.log(`get${config.name} Error: `, errors);
        }
    }
)

export const createDataAsync = createAsyncThunk(
    `${config.name}/create`,
    async (event: TData) => {
        try {
            const response = await createData(event);
            return response.data;
        } catch (err) {
            const errors = err as Error | AxiosError;
            console.log(`Create ${config.altName}: `, errors);
        }
    }
)

export const updateDataAsync = createAsyncThunk(
    `${config.name}/update`,
    async (event: TData) => {
        try {
            const response = await updateData(event);
            return response.data;
        }  catch (err) {
            const errors = err as Error | AxiosError;
            console.log(`Update ${config.altName}: `, errors);
        }
    }
)

export const deleteDataAsync = createAsyncThunk(
    `${config.name}/delete`,
    async (id: string) => {
        try {
            console.log(id)
            const response = await deleteData(id);
            return response.data;
        } catch (err) {
            const errors = err as Error | AxiosError;
            console.log(`Delete ${config.altName}: `, errors);
        }
    }
)

export const slice = createSlice({
    name: `${config.name}`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getDataAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getDataAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.data = action.payload;
        })
        .addCase(getDataAsync.rejected, (state) => {
            state.status = 'failed';
        })
        builder
        .addCase(createDataAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createDataAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.createdData = action.payload;
        })
        .addCase(createDataAsync.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export const selectData = (state: RootState) => state.sites.data;
export const selectCreatedData = (state: RootState) => state.sites.createdData;
export const selectStatus = (state: RootState) => state.sites.status;

export default slice.reducer;