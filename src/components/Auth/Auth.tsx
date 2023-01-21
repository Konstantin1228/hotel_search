import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setIsUserLoggedRequest } from '../../redux/actions/localStorageAction'
import "./auth.scss"

interface Auth {
    email: string
    password: string
}

const Auth = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm<Auth>({ mode: "onChange" });

    const onSubmit: SubmitHandler<Auth> = (data) => {
        localStorage.setItem("isUserLogged", "true")
        dispatch(setIsUserLoggedRequest(true))
    }

    return (
        <div className="auth">
            <form className="auth__window" onSubmit={handleSubmit(onSubmit)}>
                <h1 className='auth__window-title'>Simple Hotel Check</h1>
                <div className="auth__window-inputParent">
                    <span className={`smallTitle ${errors.email ? "error" : ""}`}>Логин</span>
                    <input {...register("email", {
                        required: "Поле обязательно к заполнению!",
                        pattern: {
                            value: (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu),
                            message: "Введите корректный email!"
                        }
                    })} className={`input ${errors.email ? "input-Error" : ""}`} type="email" />
                    {errors.email && <span className='error'>{errors.email.message}</span>}
                </div>
                <div className="auth__window-inputParent">
                    <span className={`smallTitle ${errors.password ? "error" : ""}`}>Пароль</span>
                    <input {...register("password", {
                        required: "Поле обязательно к заполнению!",
                        pattern: {
                            value: (/[a-zA-Z0-9]/i),
                            message: "Пароль не должен содержать кириллицы!"
                        },
                        minLength: {
                            value: 8,
                            message: "Пароль должен от 8 символов!"
                        }
                    })} className={`input ${errors.password ? "input-Error" : ""}`} type="password" />
                    {errors.password && <span className='error'>{errors.password.message}</span>}
                </div>
                <button className='button'>Войти</button>
            </form >
        </div >
    )
}

export default Auth