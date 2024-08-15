import { call, put, takeEvery } from "redux-saga/effects";
import { getTaskDetails } from "../slice/getAllTaskSlice";
import axios from "axios";

function* fetchAllTaskDetailsData(action) {
  console.log(action.payload);
  
  try {
    const response = yield call(
      axios.get,
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/task/${action.payload}`
    );

    if (response.data.length === 0) {
      yield put(getTaskDetails([]));
      return;
    }
    yield put(getTaskDetails(response.data));
  } catch (error) {
    console.error(error);
  }
}

export function* watchFetchAllTaskDetailsData() {
  yield takeEvery("FETCH_ALL_TASK_DETAILS_DATA", fetchAllTaskDetailsData);
}
