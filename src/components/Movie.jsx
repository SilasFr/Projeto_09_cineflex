import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

export default function Movie() {
    const [movie, setMovie] = useState()
    const { idMovie } = useParams()
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idMovie}/showtimes`)
        promise.then(answer => {
            setMovie(answer.data)
        })
    }, [])

    if (!movie) return <h1>Carregando</h1>
    console.log(movie)
    return (
        <>
            <div className="movie-sections">
                <h2>Selecione o horário</h2>
                {movie.days.map(item => {
                    return (
                        <div className="section" key={item.id}>
                            <p className="section-date">{item.weekday}-{item.date}</p>
                            <Showtimes>
                                {item.showtimes.map(showtime => {
                                    return (
                                        <ShowtimeDiv
                                            key={showtime.id}>
                                            <Link to={`/sessao/${showtime.id}`}>
                                                {showtime.name}
                                            </Link>
                                        </ShowtimeDiv>
                                    )
                                })}
                            </Showtimes>
                        </div>
                    )
                })}
            </div>
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-overview">
                <img src={movie.posterURL} alt={movie.title} />
                <p>{movie.overview}</p>
            </div>
        </>
    )
}

const ShowtimeDiv = styled.div`
background-color: orange;
width: 50px
`

const Showtimes = styled.div`
display: flex;
gap: 10px;
`