import { hotelTypes } from "../actionsType/hotelTypes"
import { FetchHotelListRequestPayload, FetchHotelListSuccess } from "../types/types"

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