import { localStorageTypes } from "../actionsType/localStorageTypes"
import { hotelTypes } from "../actionsType/hotelTypes"
import { favoriteHotel } from "../reducers/localStorageReducer"

export interface hotelArray {
    hotelId: number
    hotelName: string
    location: {
        country: string
        geo: {
            lon: number
            lat: number
        }
        name: string
        state: any
    }
    locationId: number
    priceAvg: number
    priceFrom: number
    pricePercentile: any
    stars: number
}

export interface FetchHotelListRequestPayload {
    location: string
    checkIn: string
    checkOut: string
}



export interface HotelState {
    hotels: hotelArray[]
    pending: boolean
    error: string | null
}

export interface FetchHotelListRequest {
    type: typeof hotelTypes.GET_HOTEL_LIST_REQUEST,
    payload: FetchHotelListRequestPayload
}

export interface FetchHotelListSuccess {
    type: typeof hotelTypes.GET_HOTEL_LIST_SUCCESS
    payload: hotelArray[]
}

export interface FetchHotelListFailure {
    type: typeof hotelTypes.GET_HOTEL_LIST_FAILURE
    payload: { error: string }
}

export type HotelActions = FetchHotelListRequest | FetchHotelListSuccess | FetchHotelListFailure



export interface SetIsUserLoggedRequest {
    type: typeof localStorageTypes.SET_USER_LOGGED_REQUEST,
    payload: boolean
}

export interface SetIsUserLoggedSuccess {
    type: typeof localStorageTypes.SET_USER_LOGGED_SUCCESS
    payload: boolean
}

export interface SetIsUserLoggedFailure {
    type: typeof localStorageTypes.SET_USER_LOGGED_FAILURE
    payload: { error: string }
}

export type AuthActions = SetIsUserLoggedRequest | SetIsUserLoggedSuccess | SetIsUserLoggedFailure



export interface SetFavoriteHotelsRequest {
    type: typeof localStorageTypes.SET_FAVORITE_HOTELS_REQUEST,
    payload: hotelArray
}

export interface SetFavoriteHotelsSuccess {
    type: typeof localStorageTypes.SET_FAVORITE_HOTELS_SUCCESS,
    payload: favoriteHotel[]
}

export interface SetFavoriteHotelsFailure {
    type: typeof localStorageTypes.SET_FAVORITE_HOTELS_FAILURE
    payload: { error: string }
}

export type SetFavoriteHotelsActions = SetFavoriteHotelsRequest | SetFavoriteHotelsSuccess | SetFavoriteHotelsFailure