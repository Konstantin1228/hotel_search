import { localStorageTypes } from "../actionsType/localStorageTypes"
import { favoriteHotel } from "../reducers/localStorageReducer"

export const setIsUserLoggedRequest = (payload: boolean) => ({
    type: localStorageTypes.SET_USER_LOGGED_REQUEST,
    payload
})

export const setIsUserLoggedSuccess = (payload: boolean) => ({
    type: localStorageTypes.SET_USER_LOGGED_SUCCESS,
    payload
})

export const setIsUserLoggedFailure = (payload: boolean) => ({
    type: localStorageTypes.SET_USER_LOGGED_FAILURE,
    payload
})



export const setFavoriteHotelsRequest = (payload: favoriteHotel) => ({
    type: localStorageTypes.SET_FAVORITE_HOTELS_REQUEST,
    payload
})

export const setFavoriteHotelsSuccess = (payload: favoriteHotel[]) => ({
    type: localStorageTypes.SET_FAVORITE_HOTELS_SUCCESS,
    payload
})

export const setFavoriteHotelsFailure = (payload: { error: string }) => ({
    type: localStorageTypes.SET_FAVORITE_HOTELS_FAILURE,
    payload
})