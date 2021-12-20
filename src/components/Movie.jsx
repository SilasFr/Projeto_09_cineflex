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
    return (
        <>
            <Container>
                <div className="movie-sections">
                    <Header>Selecione o horário</Header>
                    {movie.days.map(item => {
                        return (
                            <div className="section" key={item.id}>
                                <SectionDate>{item.weekday}-{item.date}</SectionDate>
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

            </Container>
            <Footer movie={movie} />
        </>
    )
}

function Footer({ movie }) {
    return (
        <FooterDiv>
            <Poster>
                <img src={movie.posterURL} alt={movie.title} />
            </Poster>
            <MovieTitle>
                <p>{movie.title}</p>
            </MovieTitle>
        </FooterDiv>
    )
}

const Header = styled.p`
width:100%;
height:110px;
font-size: 24px;
line-height: 28px;
display:flex;
align-items:center;
justify-content:center;

`

const Container = styled.div`
width:375px;
display:flex;
flex-direction:column;
align-items:center;
padding-bottom:120px;
`

const SectionDate = styled.p`
height:35px;
margin-bottom:23px;
font-size: 20px;
line-height: 23px;
display: flex;
align-items: center;
letter-spacing: 0.02em;
`

const ShowtimeDiv = styled.div` 
width:83px;
height:43px;
border-radius:3px;
background-color: #E8833A;
display:flex;
align-items:center;
justify-content:center;
margin-bottom:22px;
a{
    color: #fff;
    text-decoration:none;
}
`

const Showtimes = styled.div`
display: flex;
gap: 8px;
`

const FooterDiv = styled.div`
position:fixed;
bottom:0;
width:100%;
height:117px;
display:flex;
align-items:center;
gap:20px;
background-color:#DFE6ED;
`

const Poster = styled.div`
width:64px;
height:89px;
padding:8px;
margin-left:10px;
background-color:#fff;
img{
    width:100%;
    height:100%;
}
`

const MovieTitle = styled.div`
font-size: 26px;
line-height: 30px;
p{
    width:100%;
    overflow:hidden;
    word-break: break;
}
`
