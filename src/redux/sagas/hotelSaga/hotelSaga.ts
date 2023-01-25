import axios from "axios"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { fetchHotelListSucces, fetchHotelListFail } from "../../actions/hotelAction"
import { hotelTypes } from "../../actionsType/hotelTypes"
import { FetchHotelListRequestPayload } from "../../types/types"

export interface ResponseGenerator {
    config?: any,
    data?: any,
    headers?: any,
    request?: any,
    status?: number,
    statusText?: string
}

interface qeuryParam {
    location: string
    checkIn: string
    checkOut: string
}

const getHotels = ({ location, checkIn, checkOut }: qeuryParam) =>
    axios.get<hotelTypes[]>(`https://engine.hotellook.com/api/v2/cache.json?location=${location}&currency=rub&checkIn=${checkIn}&checkOut=${checkOut}&limit=20&language=ru`)


function* fetchHotelSaga({ payload }: { type: string, payload: FetchHotelListRequestPayload }) {
    try {
        const { location, checkIn, checkOut } = payload
        let { data }: ResponseGenerator = yield call(getHotels, { location, checkIn, checkOut })
        yield put(fetchHotelListSucces(data))
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) yield put(fetchHotelListFail({ error: "Введите корректный адрес!" }))

            else yield put(fetchHotelListFail({ error: "Что то пошло не так!" }))
        }
    }
}

function* hotelsSaga() {
    yield all([takeLatest(hotelTypes.GET_HOTEL_LIST_REQUEST, fetchHotelSaga)]);
}

export default hotelsSaga
