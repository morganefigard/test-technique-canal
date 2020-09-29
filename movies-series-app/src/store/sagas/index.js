import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

function fetchSimilarMovie() {
  return axios.get("https://api.themoviedb.org/3/movie/76203/similar?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&page=1");
}

function* setSimilarMovie(action) {
  try {
    const result = yield call(fetchSimilarMovie);
    yield put({type: "FETCH_SUCCEED", result})
  } catch (error) {
    yield put({type: "FETCH_FAILED", error});
  }
}

function* app() {
  yield takeEvery("SET_BASE_PATH", setSimilarMovie);
}

export default app;
