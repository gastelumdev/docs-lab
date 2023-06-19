import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TData} from './types';
import config from './config';
import { createData, deleteData, getData, getOneData, updateData } from './api';

interface TDataState {
    data: [TData] | [];
    oneData: TData;
    createdData: TData | {};
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TDataState = {
    data: [],
    oneData: {name: "", description: "", owner: ""},
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

export const getOneDataAsync = createAsyncThunk(
    `${config.name}/getOne`,
    async (id: string) => {
        try {
            const response = await getOneData(id);
            localStorage.setItem(`${config.parentFeature}Id`, response.data[config.altName]);
            localStorage.setItem(`${config.altName}Id`, response.data._id);
            return response.data;
        } catch (err) {
            const errors = err as Error | AxiosError;
            console.log(`GetOne ${config.name}: `, errors);
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
        .addCase(getOneDataAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getOneDataAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.oneData = action.payload;
        })
        .addCase(getOneDataAsync.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export const selectData = (state: RootState) => state.sites.data;
export const selectCreatedData = (state: RootState) => state.sites.createdData;
export const selectStatus = (state: RootState) => state.sites.status;
export const selectOneData = (state: RootState) => state.sites.oneData;

export default slice.reducer;