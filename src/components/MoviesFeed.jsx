import { useState, useEffect } from "react";
import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";

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
        <div>{
            moviesList.map(item => {
                return (
                    <div key={item.id}>
                        <Link to={`/filme/${item.id}`}>
                            <p>{item.title}</p>
                            <img src={item.posterURL} />
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}