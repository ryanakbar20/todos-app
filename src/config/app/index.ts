import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/todos/api-slice";
import todosReducer from "../features/todos/todos-slice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
