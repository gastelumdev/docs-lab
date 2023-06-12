import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import eventsReducer from '../features/events/eventsSlice';
import participantReducer from '../features/participants/participantSlice';
import sitesReducer from '../features/sites/slice';
import pagesReducer from '../features/pages/slice';
import sectionsReducer from '../features/sections/slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer,
        participants: participantReducer,
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