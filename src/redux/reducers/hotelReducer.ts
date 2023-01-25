import { hotelTypes } from "../actionsType/hotelTypes";
import { HotelActions } from "../types/types";
import { HotelState } from "../types/types";

const initialState: HotelState = {
    hotels: [],
    pending: false,
    error: null,
};

const hotelReducer = (state = initialState, action: HotelActions): HotelState => {
    switch (action.type) {
        case hotelTypes.GET_HOTEL_LIST_REQUEST:
            return { ...state, pending: true, error: null }
        case hotelTypes.GET_HOTEL_LIST_SUCCESS:
            return { ...state, pending: false, hotels: action.payload }
        case hotelTypes.GET_HOTEL_LIST_FAILURE:
            return { ...state, pending: false, error: action.payload.error, hotels: [] }
        default:
            return state
    }
}

export default hotelReducer