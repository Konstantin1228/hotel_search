import { all, put, takeLatest } from "redux-saga/effects"
import { setFavoriteHotelsFailure, setFavoriteHotelsSuccess, setIsUserLoggedFailure, setIsUserLoggedSuccess } from "../../actions/actionCreate"
import { localStorageTypes } from "../../actionsType/localStorageTypes"
import { favoriteHotel } from "../../reducers/localStorageReducer"
import { hotelArray } from "../../types/types"

function* setUserAuthSaga({ payload }: { type: string, payload: boolean }) {
    try {
        yield localStorage.setItem("isUserLogged", JSON.stringify(payload))
        yield put(setIsUserLoggedSuccess(payload))
    } catch (error) {
        yield put(setIsUserLoggedFailure(false))
    }
}

function* setFavoriteHotels({ payload }: { type: string, payload: favoriteHotel }) {
    try {
        const favoriteHotels = localStorage.getItem("favoriteHotels")
        let data = favoriteHotels ? JSON.parse(favoriteHotels) as favoriteHotel[] : []

        data.find(el => el.favoriteHotel.hotelName === payload.favoriteHotel.hotelName) ?
            data = data.filter(el => el.favoriteHotel.hotelName !== payload.favoriteHotel.hotelName) :
            data.push(payload)

        yield localStorage.setItem("favoriteHotels", JSON.stringify(data))
        yield put(setFavoriteHotelsSuccess(data))
    }
    catch (error) {
        yield put(setFavoriteHotelsFailure({ error: error as string }))
    }
}

function* localStorageSaga() {
    yield all([
        takeLatest(localStorageTypes.SET_USER_LOGGED_REQUEST, setUserAuthSaga),
        takeLatest(localStorageTypes.SET_FAVORITE_HOTELS_REQUEST, setFavoriteHotels),
    ]);
}

export default localStorageSaga