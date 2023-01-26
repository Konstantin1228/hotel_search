import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import FavoriteHotel from './Hotel/FavoriteHotel'
import HotelOffer from './Hotel/HotelOffer'
import Loader from '../../UI/Loader/Loader';
import { BottomArrow, TopArrow } from '../../img/icons';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { hotelArray } from '../../redux/types/types';
import { fetchHotelList } from '../../redux/actions/hotelAction';

import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/free-mode";
import "./home.scss"

import { useForm, SubmitHandler } from 'react-hook-form';

interface Form {
    location: string
    checkIn: string
    days: number
}

const Home = () => {
    const dispatch = useDispatch()
    const [activeSort, setActiveSort] = useState({ sortType: "rating", lessToMore: false })
    const [dateInfo, setDateInfo] = useState({ arrivalDate: "", differnceBetweenDates: 0 })

    const locale = "fr-CA"
    const languageLocale = "ru-RU"
    const { register, watch, setError, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm<Form>({
        mode: "onChange", defaultValues: {
            location: "Москва",
            checkIn: new Date().toLocaleDateString(locale),
            days: 1,
        }
    });

    useEffect(() => {
        const currentDate = new Date()
        const days = watch("days")
        const checkOutDate = new Date(currentDate.setDate(currentDate.getDate() + +days)).toLocaleDateString(locale)
        const checkIn = new Date().toLocaleDateString(locale)
        const arrivalDate = new Date(checkIn).toLocaleDateString(languageLocale, { weekday: undefined, year: "numeric", month: "long", day: "numeric" }).replace(/.{2}$/, "")
        setDateInfo({ arrivalDate: arrivalDate, differnceBetweenDates: watch("days") })
        dispatch(fetchHotelList({ location: watch("location"), checkIn, checkOut: checkOutDate }))
    }, [])

    const { hotels, pending, error } = useSelector((state: RootState) => state.hotelReducer)
    const { favoriteHotels } = useSelector((state: RootState) => state.localStorageReducer)

    const changeDate = (date: string) => {
        setValue("checkIn", date)
        if (date.length === 0) {
            setError("checkIn", { type: "custom", message: "Поле обязательно к заполнению!" })
            return false
        }
        const pickedDate = new Date(date).toLocaleDateString(locale)
        const currentDate = new Date().toLocaleDateString(locale)
        if (pickedDate < currentDate) setError("checkIn", { type: "custom", message: "Введите корректную дату!" })
        else {
            clearErrors("checkIn")
            return true
        }
    }

    const onSubmit: SubmitHandler<Form> = ({ location, checkIn, days }) => {
        const checkInDate = new Date(checkIn.split(".").reverse().toString())
        const arrivalDate = checkInDate.toLocaleDateString(languageLocale, { year: "numeric", month: "long", day: "numeric" }).replace(/.{2}$/, "")
        const checkOut = new Date(checkInDate.setDate(checkInDate.getDate() + +days)).toLocaleDateString(locale)
        if (changeDate(watch("checkIn"))) {
            setDateInfo({ arrivalDate, differnceBetweenDates: watch("days") })
            dispatch(fetchHotelList({ location, checkIn: checkInDate.toLocaleDateString(locale), checkOut }))
        }
    }

    const sortClick = (a: hotelArray, b: hotelArray) => {
        if (activeSort.sortType === "rating") {
            return activeSort.lessToMore ? a.stars - b.stars : b.stars - a.stars
        }
        if (activeSort.sortType === "price") {
            return activeSort.lessToMore ? a.priceAvg - b.priceAvg : b.priceAvg - a.priceAvg
        }
        return 0
    }

    const changeSortType = (sortType: string) => {
        if (activeSort.sortType === sortType) setActiveSort((prev) => ({ ...prev, lessToMore: !prev.lessToMore }))
        else setActiveSort((prev) => ({ ...prev, sortType: sortType }))
    }

    const isActiveArrow = (sortType: string, lessToMore: boolean) => activeSort.lessToMore === lessToMore && activeSort.sortType === sortType ? "active-svg" : ""
    const cityName = hotels.find(el => el.location.name)?.location.name

    return (
        <div className="home">
            <Header />
            <div className="home__inner">
                <div className="home__left">
                    <form className="wrapper" onSubmit={handleSubmit(onSubmit)}>
                        <div className="auth__window-inputParent">
                            <h2 className={`smallTitle ${errors.location ? "error" : ""}`}>Локация</h2>
                            <input {...register("location", {
                                required: "Поле обязательно к заполнению!",
                                minLength: {
                                    value: 3,
                                    message: "Название города от 3 символов!"
                                },
                                maxLength: {
                                    value: 15,
                                    message: "Название города до 20 символов!"
                                },
                            })} className={`input${errors.location ? "-Error" : ""}`} type="text" placeholder='Москва' />
                            {errors.location?.message && <span className="error">{errors.location.message || "Ошибка!"}</span>}
                        </div>
                        <div className="auth__window-inputParent">
                            <h2 className={`smallTitle ${errors.checkIn ? "error" : ""}`}>Дата заселения</h2>
                            <input
                                defaultValue={new Date().toISOString().substr(0, 10)}
                                onChange={(e) => changeDate(e.target.value)}
                                className={`input${errors.checkIn ? "-Error" : ""}`}
                                type="date" />
                            {errors.checkIn?.message && <span className="error">{errors.checkIn.message || "Ошибка!"}</span>}
                        </div>
                        <div className="auth__window-inputParent">
                            <h2 className={`smallTitle ${errors.days ? "error" : ""}`}>Количество дней</h2>
                            <input {...register("days", {
                                required: "Поле обязательно к заполнению!",
                                min: {
                                    value: 1,
                                    message: "Минимальное количество дней-1"
                                }
                            })}
                                className={`input${errors.days ? "-Error" : ""}`} type="number" />
                            {errors.days?.message && <span className="error">{errors.days.message || "Ошибка!"}</span>}
                        </div>
                        <button className='button' type='submit'>Найти</button>
                    </form>
                    <section className="wrapper wrapper-favorite">
                        <h1 className="smallTitle">Избранное</h1>
                        {favoriteHotels.length > 0 ?
                            <>
                                <div className="wrapper-favorite-filter">
                                    <button className={activeSort.sortType === "rating" ? 'active' : ""} onClick={() => changeSortType("rating")}>
                                        <span>Рейтинг</span>
                                        <div className="wrapper-favorite-filter-arrows">
                                            <TopArrow className={isActiveArrow("rating", false)} />
                                            <BottomArrow className={isActiveArrow("rating", true)} />
                                        </div>
                                    </button>
                                    <button className={activeSort.sortType === "price" ? 'active' : ""} onClick={() => changeSortType("price")}>
                                        <span>Цена</span>
                                        <div className="wrapper-favorite-filter-arrows">
                                            <TopArrow className={isActiveArrow("price", false)} />
                                            <BottomArrow className={isActiveArrow("price", true)} />
                                        </div>
                                    </button>
                                </div>
                                <div className="wrapper-favorite-hotels">
                                    {favoriteHotels.sort((a, b) => sortClick(a.favoriteHotel, b.favoriteHotel)).map((el, idx) =>
                                        <FavoriteHotel {...el} key={idx} />
                                    )}
                                </div>
                            </>
                            :
                            <span>Вы не добавляли отели в избранное!</span>
                        }
                    </section>
                </div>
                <div className="home__right wrapper"
                    style={pending ? { display: "flex", alignItems: "center", justifyContent: "center" } : {}}>
                    {pending ?
                        <Loader />
                        :
                        hotels.length > 0 ?
                            <>
                                <div className="home__right-title">
                                    <h1>Отели &nbsp;
                                        <span>
                                            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1.33334L9.66667 10L1 18.6667" stroke="#A7A7A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            &nbsp;
                                        </span>
                                        {cityName}
                                    </h1>
                                    <span className='date'>{dateInfo.arrivalDate}</span>
                                </div>
                                <Swiper
                                    slidesPerView={3.5}
                                    spaceBetween={30}
                                    modules={[FreeMode]}
                                    grabCursor={true}
                                    className="home__right-slider"
                                    watchSlidesProgress={true}
                                >
                                    <SwiperSlide>
                                        <img src={require("../../img/forestImage/forest1.png")} alt="forest" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require("../../img/forestImage/forest2.png")} alt="forest" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require("../../img/forestImage/forest3.png")} alt="forest" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require("../../img/forestImage/forest1.png")} alt="forest" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require("../../img/forestImage/forest2.png")} alt="forest" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require("../../img/forestImage/forest3.png")} alt="forest" />
                                    </SwiperSlide>
                                </Swiper>
                                {favoriteHotels.length > 0 && <h1 className="offer-title">Добавлено в Избранное: <span>{favoriteHotels.length}</span> отеля</h1>}
                                <div className="home__right-offers">
                                    {hotels.map((el, idx) =>
                                        <HotelOffer {...{ hotelArray: el, arrivalDate: dateInfo.arrivalDate, differnceBetweenDates: dateInfo.differnceBetweenDates }} key={idx} />
                                    )}
                                </div>
                            </>
                            :
                            error !== null ?
                                <div className="home__right-title">
                                    <h1 className='error' style={{ maxWidth: "none" }}>{error}</h1>
                                </div>
                                :
                                <div className='home__right-title'>
                                    <h1>Настройте параметры поиска.</h1>
                                </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Home