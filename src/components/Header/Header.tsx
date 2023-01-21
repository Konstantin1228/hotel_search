import React from 'react'
import { useDispatch } from 'react-redux'
import { LogOutIcon } from '../../img/icons'
import { setIsUserLoggedRequest } from '../../redux/actions/localStorageAction'
import "./header.scss"
const Header = () => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setIsUserLoggedRequest(false))
        localStorage.setItem("favoriteHotels", "")
    }

    return (
        <header className='header'>
            <h1 className='header__title'>Simple Hotel Check</h1>
            <div className="header__logout" onClick={handleClick}>
                <span>Выйти</span>
                <LogOutIcon />
            </div>
        </header>
    )
}

export default Header