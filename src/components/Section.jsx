import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import styled from "styled-components";

export default function Section({ seats, setSeats, ticket, setTicket, setCpf, setName }) {
    const { idSessao } = useParams()
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`)
        promise.then(answer => {
            setSeats(answer.data)
        })
    }, [])
    if (!seats) return <h1>Carregando</h1>
    console.log(seats)
    return (
        <>
            <Header>Selecione o(s) assento(s)</Header>
            <Seats>
                {seats.seats.map(seat => {
                    return (
                        <Seat key={seat.id}>{seat.name}</Seat>
                    )
                })}
            </Seats>
            <Chekout>
                <label>Nome do comprador:</label>
                <input
                    inplace="Digite seu nome..."
                    onChange={e => {
                        setName(e.target.value)
                    }}></input>
                <label>CPF do comprador:</label>
                <input
                    inplace="Digite seu CPF"
                    onChange={e => {
                        setCpf(e.target.value)
                    }}></input>

                <button>
                    <Link to='/sucesso'>
                        Reservar assentos(s)
                    </Link>
                </button>
            </Chekout>
            <Footer movie={seats.movie}></Footer>
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

const Header= styled.p`
width: 374px;
height: 110px;

font-family: Roboto;
font-size: 24px;
line-height: 28px;
display: flex;
align-items: center;
justify-content: center;
letter-spacing: 0.04em;

color: #293845;
`

const Seat = styled.div`
    background-color: gray;
    width: 25px;
    height:25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Seats = styled.div`
    margin: 0 auto;
    width:327px;
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
    gap: 7px;
`
const Chekout = styled.div`
    display:flex;
    gap: 5px;
    flex-direction: column;

    button{
        width: 225px;
        height: 42px;
        margin:0 auto;
        border: none;
        color: #fff;
        font-weight: bold;
        border-radius: 6px;
        background-color: orange;
    }
    label{
        color: #293845;
        font-size: 18px;
        line-height: 21px;
    }
    input{
        width: 327px;
        height: 51px;
        border:1px solid #D4D4D4;
        border-radius: 3px;
    }
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