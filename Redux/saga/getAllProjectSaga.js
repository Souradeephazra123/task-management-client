import { call, put, takeEvery } from "redux-saga/effects";
import { getProjectDetails } from "../slice/getAllProjectSlice";
import axios from "axios";

function* fetchAllProjectDetailsData(action) {
  try {
    const response = yield call(
      axios.get,
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/project/${action.payload}`
    );

    if (response.data.length === 0) {
      yield put(getProjectDetails([]));
      return;
    }
    yield put(getProjectDetails(response.data));
  } catch (error) {
    console.error(error);
  }
}

export function* watchFetchAllProjectDetailsData() {
  yield takeEvery("FETCH_ALL_PROJECT_DETAILS_DATA", fetchAllProjectDetailsData);
}
