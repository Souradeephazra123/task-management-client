import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import projectDetailsReducer from "./slice/getAllProjectSlice";
import taskDetailsReducer from "./slice/getAllTaskSlice";
import rootSaga from "./saga/index";
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    ProjectDetails: projectDetailsReducer,
    TaskDetails: taskDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
