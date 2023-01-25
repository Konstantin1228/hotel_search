import { localStorageTypes } from "../actionsType/localStorageTypes";
import { AuthActions, hotelArray, SetFavoriteHotelsActions } from "../types/types";

export interface favoriteHotel {
    favoriteHotel: hotelArray
    arrivalDate: string
    differnceBetweenDates: number
}

interface AuthState {
    isUserLogged: boolean
    favoriteHotels: favoriteHotel[]
}

const isLogged = localStorage.getItem("isUserLogged")
const favoriteHotels = localStorage.getItem("favoriteHotels")

const initialState: AuthState = {
    isUserLogged: isLogged ? JSON.parse(isLogged) : false,
    favoriteHotels: favoriteHotels ? JSON.parse(favoriteHotels) : [],
};

const localStorageReducer = (state = initialState, action: AuthActions | SetFavoriteHotelsActions): AuthState => {
    switch (action.type) {
        case localStorageTypes.SET_USER_LOGGED_REQUEST:
            return { ...state }
        case localStorageTypes.SET_USER_LOGGED_SUCCESS:
            return { ...state, isUserLogged: action.payload, favoriteHotels: [] }
        case localStorageTypes.SET_USER_LOGGED_FAILURE:
            return { ...state, isUserLogged: false }

        case localStorageTypes.SET_FAVORITE_HOTELS_REQUEST:
            return { ...state }
        case localStorageTypes.SET_FAVORITE_HOTELS_SUCCESS:
            return { ...state, favoriteHotels: action.payload }
        case localStorageTypes.SET_FAVORITE_HOTELS_FAILURE:
            return { ...state }

        default:
            return state
    }
}

export default localStorageReducer