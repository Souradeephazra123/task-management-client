import { all } from "redux-saga/effects";
import { watchFetchAllProjectDetailsData } from "./getAllProjectSaga.js";
import { watchFetchAllTaskDetailsData } from "./getAllTaskSaga.js";
export default function* rootSaga() {
  yield all([
    watchFetchAllProjectDetailsData(),
    watchFetchAllTaskDetailsData(),
  ]);
}
