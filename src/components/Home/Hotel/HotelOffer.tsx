import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { LikeIcon, StarIcon } from '../../../img/icons'
import { setFavoriteHotelsRequest } from '../../../redux/actions/localStorageAction'
import { RootState } from '../../../redux/reducers'
import { hotelArray } from '../../../redux/types/types'
import "./hotel.scss"

export interface hotelProps {
    hotelArray: hotelArray
    arrivalDate: string
    differnceBetweenDates: number
}

export function num_word(value: number, words: string[]) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return `${value} ${words[2]} `
    if (num > 1 && num < 5) return `${value} ${words[1]} `
    if (num == 1) return `${value} ${words[0]} `
    return `${value} ${words[2]} `;
}

const HotelOffer: React.FC<hotelProps> = ({ hotelArray, arrivalDate, differnceBetweenDates }) => {
    const dispatch = useDispatch()
    const { favoriteHotels } = useSelector((state: RootState) => state.localStorageReducer)
    const [activeHeart, setActiveHeart] = useState(false)

    useEffect(() => {
        setActiveHeart(!!favoriteHotels.find(el =>
            el.favoriteHotel.hotelName === hotelArray.hotelName &&
            el.arrivalDate === arrivalDate &&
            el.differnceBetweenDates === differnceBetweenDates
        ))
    }, [favoriteHotels])

    const handleClick = () => {
        dispatch(setFavoriteHotelsRequest({ favoriteHotel: hotelArray, arrivalDate, differnceBetweenDates }))
    }

    return (
        <div className="hotelOffer">
            <div className="hotelOffer-left">
                <img src={require("../../../img/icons/houseIcon.png")} alt="" />
                <div>
                    <h3 className='offer-title'>{hotelArray.hotelName}</h3>
                    <div className="hotelOffer-left-date">
                        {arrivalDate} &nbsp; <span></span> &nbsp; {num_word(differnceBetweenDates, ['день', 'дня', 'дней'])}
                    </div>
                    <div className="rating">
                        {new Array(5).fill("").map((el, idx) => idx + 1 <= hotelArray.stars ? <StarIcon key={idx} className={"activeStar"} /> : <StarIcon key={idx} />)}
                    </div>
                </div>
            </div>
            <div className="hotelOffer-right">
                <button className='like'>
                    <LikeIcon className={activeHeart ? "heartActive" : "heart"} onClick={handleClick} />
                </button>
                <span>Price: &nbsp; <span>{new Intl.NumberFormat('ru-RU').format(Math.ceil(hotelArray.priceAvg))} ₽</span> </span>
            </div>
        </div>
    )
}

export default HotelOffer