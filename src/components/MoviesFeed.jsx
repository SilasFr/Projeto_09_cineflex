import { useState, useEffect } from "react";
import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function MoviesFeed() {
    const [moviesList, setMoviesList] = useState()
    useEffect(() => {
        const promise = axios.get('https://mock-api.driven.com.br/api/v4/cineflex/movies')
        promise.then(answer => {
            setMoviesList(answer.data)

        })
    }, [])

    if (!moviesList) return <h1>Carregando</h1>
    console.log(moviesList)
    return (
        <Container>
            <p>Selecione o filme</p>
            
            {
            moviesList.map(item => {
                return (
                    <Movie key={item.id}>
                        <Link to={`/filme/${item.id}`}>
                            {/* <p>{item.title}</p> */}
                            <img src={item.posterURL} />
                        </Link>
                    </Movie>
                )
            })}
        </Container>
    )
}

const Container = styled.div`
width:100%;
display:flex;
flex-wrap: wrap;
justify-content:center;
align-items: center;
gap:30px;
p{
    width:100%;
    height:100px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size: 24px;
    line-height: 28px;
}
`

const Movie = styled.div`
width:145px;
height: 209px;
padding:8px;
border:2px solid black;
img{
    width:100%;
    height:100%;
}

`