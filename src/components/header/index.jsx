import React, { useEffect, useState } from 'react'
import { parseJwt } from '../../utils/jwtDecode'
import {
    mainContainer,
    menu,
    selectedMenuItem,
    menuItem,
    itemTitle,
    itemSubTitle,
    loginButton,
    loginContainer,
    inputTextbox,
    submitButton,
    loader,
    errorLabel,
    userMenu,
    userMenuButton,
    newAccountButton,
} from './styles.module.css'
import { Link } from 'react-router-dom'

export const Header = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [token, setToken] = useState('')

    const closeLoginContainer = () => [
        setShowLogin(false)
    ]

    const openLoginContainer = (e) => {
        e.stopPropagation()
        setShowLogin(true)
    }

    const onLoginResponse = (res) => {
        try {
            const response = JSON.parse(res.target.response)
            document.cookie = "token=" + response.token
            setShowLogin(false)
            setToken(response.token)
            setPassword('')
        } catch {
            setError(res.target.response)
        }
        setLoading(false)
    }

    const onLogin = () => {
        if (loading) return
        if (!email || !password) {
            setError('Preencha todos os campos!')
            return
        }
        if (email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/).length == 0) {
            setError('Email inválido!')
            return
        }
        setError('')
        setLoading(true)
        const xHttp = new XMLHttpRequest()
        xHttp.onload = onLoginResponse
        xHttp.open("POST", "https://projeto-web-3-anichart.herokuapp.com/login", true)
        xHttp.setRequestHeader("Content-Type", "application/json")
        xHttp.send(JSON.stringify({
            email,
            senha: password,
        }))
    }

    const onExit = (e) => {
        e.stopPropagation()
        document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        setToken('')
        setEmail('')
        setShowLogin(false)
    }

    useEffect(() => {
        document.addEventListener('click', closeLoginContainer)

        const tokenFromCookie = document.cookie.replace(/token=(.*)/, '$1')
        if (!!tokenFromCookie) {
            setToken(tokenFromCookie)
            const tk = parseJwt(tokenFromCookie)
            setEmail(tk.email)
        }

        return () => {
            document.removeEventListener('click', closeLoginContainer)
        }
    }, [])

    return <div className={mainContainer}>
        <div />
        <Link to="/"><img src='./logo.png' /></Link>
        <div className={menu}>
            <div className={selectedMenuItem}>
                <div className={itemTitle}>Winter</div>
                <div className={itemSubTitle}>2022</div>
            </div>
            <div className={menuItem}>
                <div className={itemTitle}>Spring</div>
                <div className={itemSubTitle}>2022</div>
            </div>
            <div className={menuItem}>
                <div className={itemTitle}>Summer</div>
                <div className={itemSubTitle}>2021</div>
            </div>
            <div className={menuItem}>
                <div className={itemTitle}>Fall</div>
                <div className={itemSubTitle}>2021</div>
            </div>
        </div>
        <button className={loginButton} onClick={openLoginContainer}>
            {!!token ? <>
                {`Olá, ${email}`}
                {showLogin && <div className={userMenu}>
                    <Link to="posts"><button className={userMenuButton}>Posts</button></Link>
                    <Link to="newPost"><button className={userMenuButton}>Nova Postagem</button></Link>
                    <button className={userMenuButton} onClick={onExit}>Sair</button>
                </div>}
            </> : <>
                Login
                {showLogin && <div className={loginContainer}>
                    <input
                        type='email'
                        className={inputTextbox}
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        className={inputTextbox}
                        placeholder='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!!error && <div className={errorLabel}>{error}</div>}
                    <button className={submitButton} onClick={onLogin}>{loading ? <div className={loader} /> : 'Login'}</button>
                    <Link to="/register"><button className={newAccountButton}>Nova Conta</button></Link>
                </div>}
            </>}
        </button>
        <div />
    </div>
}
