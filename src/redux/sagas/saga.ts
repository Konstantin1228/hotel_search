import { all, fork } from "redux-saga/effects";
import localStorageSaga from "./localStorageSaga/localStorageSaga";
import hotelsSaga from "./hotelSaga/hotelSaga";

export default function* rootSaga() {
    yield all([fork(hotelsSaga), fork(localStorageSaga)])
}