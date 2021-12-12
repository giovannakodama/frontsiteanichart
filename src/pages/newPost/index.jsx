import React, { useRef, useState } from 'react'
import {
    form,
    titleLabel,
    input,
    textArea,
    newFile,
    submitButton,
    loader,
    errorLabel,
} from './styles.module.css'

export const NewPost = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    let fileInput = useRef()

    const onNewPostResponse = (res) => {
        setLoading(false)
        try {
            const response = JSON.parse(res.target.response)
            alert('Post criado com sucesso!')
            setTitle('')
            setDesc('')
        } catch {
            setError('Erro ao criar post!')
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!title || !desc) setError('É preciso preencher título e descrição!')
        else {
            setError('')
            setLoading(true)
            const xHttp = new XMLHttpRequest()
            xHttp.onload = onNewPostResponse
            xHttp.open("POST", "http://localhost:3000/newPost", true)
            xHttp.setRequestHeader("Authorization", `Bearer ${document.cookie.replace(/token=(.*)/, "$1")}`)
            const formData = new FormData()
            formData.append("titulo", title)
            formData.append("descricao", desc)
            for (let i = 0; i < fileInput.files.length; i++)
                formData.append("files", fileInput.files[i])
            xHttp.send(formData)
        }
    }

    return <div>
        <form className={form} onSubmit={onSubmit}>
            <a className={titleLabel}>Novo Post</a>
            <input
                type="text"
                className={input}
                placeholder='Título'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className={textArea}
                placeholder='Descrição'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <input type='file' multiple className={newFile} ref={ref => fileInput = ref} />
            {!!error && <a className={errorLabel}>{error}</a>}
            <button className={submitButton}>{loading ? <div className={loader} /> : 'Enviar'}</button>
        </form>
    </div>
}
