import React, { useEffect, useState } from 'react'

import {
    container,
    postContainer,
    title,
    description,
    image,
    searchContainer,
    searchInput,
    searchButton,
    fileContainer,
} from './styles.module.css'

export const Posts = () => {
    const [error, setError] = useState('')
    const [posts, setPosts] = useState([])
    const [searchText, setSearchText] = useState('')

    const getPostsResponse = (res) => {
        try {
            const posts = JSON.parse(res.target.response)
            setPosts(posts)
        } catch {
            setError('Erro ao receber os posts!')
        }
    }

    const onSearch = () => {
        const xHttp = new XMLHttpRequest()
        xHttp.onload = getPostsResponse
        xHttp.open("GET", `https://projeto-web-3-anichart.herokuapp.com/post?titulo=${searchText}`, true)
        xHttp.setRequestHeader("Authorization", `Bearer ${document.cookie.replace(/token=(.*)/, "$1")}`)
        xHttp.send()
    }

    const onDownload = (fileName) => {
        const xHttp = new XMLHttpRequest()
        xHttp.onload = getPostsResponse
        xHttp.open("GET", ``, true)
        xHttp.setRequestHeader("Authorization", `Bearer ${document.cookie.replace(/token=(.*)/, "$1")}`)
        xHttp.send()
    }

    useEffect(() => {
        const xHttp = new XMLHttpRequest()
        xHttp.onload = getPostsResponse
        xHttp.open("GET", "https://projeto-web-3-anichart.herokuapp.com/post", true)
        xHttp.setRequestHeader("Authorization", `Bearer ${document.cookie.replace(/token=(.*)/, "$1")}`)
        xHttp.send()
    }, [])

    return <div className={container}>
        <div className={searchContainer}>
            <input
                type='text'
                className={searchInput}
                placeholder='Procurar por título'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button className={searchButton} onClick={onSearch}>Procurar</button>
        </div>
        {posts.map(post => <div className={postContainer}>
            <div className={title}>{post.titulo}</div>
            <div className={description}>{post.descricao}</div>
            {post.arquivos.filter(arquivo => arquivo.mimetype.includes('jpeg') || arquivo.mimetype.includes('png')).map(imagem =>
                <img src={`https://projeto-web-3-anichart.herokuapp.com/image/${imagem.filename}`} className={image} />
            )}
            {post.arquivos.filter(arquivo => !arquivo.mimetype.includes('jpeg') && !arquivo.mimetype.includes('png')).map(file =>
                <div className={fileContainer}><a href={`https://projeto-web-3-anichart.herokuapp.com/file/${file.filename}`}>{file.originalname}</a></div>
            )}
        </div>)}
    </div>
}
