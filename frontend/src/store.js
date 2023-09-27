import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './slice/loginSlice';
import { apiSlice } from './slice/apiSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;