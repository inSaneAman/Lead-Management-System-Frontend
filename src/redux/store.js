import {configureStore} from '@reduxjs/toolkit';
import authSliceReducer from './slices/authSlice';
import leadSliceReducer from './slices/leadSlice';
const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        lead: leadSliceReducer,
    },
    devTools: true,
});

export default store;
