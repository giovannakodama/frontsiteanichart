import React, { useState } from 'react'
import {
    form,
    title,
    input,
    registerButton,
    errorLabel,
    loader,
} from './styles.module.css'

export const Register = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const onRegisterResponse = (res) => {
        setLoading(false)
        if (res.target.response === 'OK') {
            alert('Conta criada com sucesso!')
            setEmail('')
            setPass('')
        } else {
            setError(res.target.response)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (loading) return
        setError('')
        if (!email || !pass) setError('Preencha todos os campos!')
        else {
            setLoading(true)
            const xHttp = new XMLHttpRequest()
            xHttp.onload = onRegisterResponse
            xHttp.open("POST", "http://localhost:3000/register", true)
            xHttp.setRequestHeader("Content-Type", "application/json")
            xHttp.send(JSON.stringify({
                email,
                senha: pass,
            }))
        }
    }

    return <div>
        <form className={form} onSubmit={onSubmit}>
            <a className={title}>Nova Conta</a>
            <input
                className={input}
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className={input}
                type="password"
                placeholder='Senha'
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />
            {!!error && <a className={errorLabel}>{error}</a>}
            <button className={registerButton}>{loading ? <div className={loader} /> : 'Registrar'}</button>
        </form>
    </div>
}
