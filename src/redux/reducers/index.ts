import { combineReducers } from "redux";
import localStorageReducer from "./localStorageReducer";
import hotelReducer from "./hotelReducer";
const rootReducer = combineReducers({
    hotelReducer: hotelReducer,
    localStorageReducer: localStorageReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer