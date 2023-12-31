import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import sitesReducer from '../features/sites/slice';
import pagesReducer from '../features/pages/slice';
import sectionsReducer from '../features/sections/slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sites: sitesReducer,
        pages: pagesReducer,
        sections: sectionsReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;