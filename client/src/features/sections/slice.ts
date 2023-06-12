import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TData } from './types';
import { createData, deleteData, getOneData, getData, updateData } from './api';
import config  from './config';

interface TParticipantState {
    data: [TData] | [];
    createdData: TData | {};
    oneData: TData,
    status: 'idle' | 'loading' | 'failed'; 
    err: string | null;
}

const initialState: TParticipantState = {
    data: [],
    createdData: {},
    oneData: config.defaultData,
    status: 'idle',
    err: null,
}

export const getDataAsync = createAsyncThunk(
    `${config.name}/get`,
    async (dataId: string | null) => {
        console.log(dataId)
        try {
            const response = await getData(dataId);
            console.log(response.data)
            return response.data;
        } catch (err) {
            const errors = err as Error | AxiosError;
            console.log(`Get ${config.name}: `, errors);
        }
        
    }
)

export const createDataAsync = createAsyncThunk(
    `${config.name}/create`,
    async (data: TData, {rejectWithValue}) => {
        try {
            // data.status = "Pending";
            const response = await createData(data);
            return response.data;
        } catch (err) {
            const errors = err as Error | AxiosError;
            console.log(`Create ${config.altName}: `, errors);
            return rejectWithValue({message: "Already exists."});
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
    async (data: TData) => {
        try {
            const response = await updateData(data);
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
            const response = await deleteData(id);
            return response.data;
        } catch (err) {
            const errors = err as Error | AxiosError;
            console.log(`Delete ${config.altName}: `, errors);
        }
    }
)


export const slice = createSlice({
    name: config.name,
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
            console.log(action.payload);
            state.createdData = action.payload;
            
        })
        .addCase(createDataAsync.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action.payload);
            state.err = "Already exists";
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

export const selectData = (state: RootState) => state.sections.data;
export const selectCreatedData = (state: RootState) => state.sections.createdData;
export const selectOneData = (state: RootState) => state.sections.oneData;
export const selectStatus = (state: RootState) => state.sections.status;
export const selectError = (state: RootState) => state.sections.err;

export default slice.reducer;