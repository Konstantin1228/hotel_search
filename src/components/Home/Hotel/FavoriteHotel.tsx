import React from 'react'
import { useDispatch } from 'react-redux'
import {  LikeIcon, StarIcon } from '../../../img/icons'
import { setFavoriteHotelsRequest } from '../../../redux/actions/localStorageAction'
import { favoriteHotel } from '../../../redux/reducers/localStorageReducer'
import "./hotel.scss"

const FavoriteHotel: React.FC<favoriteHotel> = ({ favoriteHotel, arrivalDate, differnceBetweenDates }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setFavoriteHotelsRequest({ favoriteHotel, arrivalDate, differnceBetweenDates }))
    }

    return (
        <div className="favoriteHotel ">
            <div className="favoriteHotel-left">
                <h3 className='offer-title'>{favoriteHotel.hotelName}</h3>
                <div className="favoriteHotel-left-date">
                    {arrivalDate} &nbsp; <span></span> &nbsp; {differnceBetweenDates} день
                </div>
                <div className="rating">
                    {new Array(5).fill("").map((el, idx) => idx + 1 <= favoriteHotel.stars ? <StarIcon key={idx} className={"activeStar"} /> : <StarIcon key={idx} />)}
                </div>
            </div>
            <div className="favoriteHotel-right">
                <button className='like' onClick={() => handleClick()}>
                    <LikeIcon className="heartActive" />
                </button>
                <span>Price: &nbsp; <span>{new Intl.NumberFormat('ru-RU').format(Math.ceil(favoriteHotel.priceAvg))} ₽</span> </span>
            </div>
        </div>
    )
}

export default FavoriteHotel