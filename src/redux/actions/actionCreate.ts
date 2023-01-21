import { localStorageTypes } from "../actionsType/localStorageTypes";
import { hotelTypes } from "../actionsType/hotelTypes";
import { FetchHotelListRequestPayload, FetchHotelListSuccess, hotelArray } from "../types/types";
import { favoriteHotel } from "../reducers/localStorageReducer";

export const fetchHotelList = (payload: FetchHotelListRequestPayload) => ({
    type: hotelTypes.GET_HOTEL_LIST_REQUEST,
    payload
})

export const fetchHotelListSucces = (payload: FetchHotelListSuccess) => ({
    type: hotelTypes.GET_HOTEL_LIST_SUCCESS,
    payload
})

export const fetchHotelListFail = (payload: { error: string }) => ({
    type: hotelTypes.GET_HOTEL_LIST_FAILURE,
    payload
})



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
