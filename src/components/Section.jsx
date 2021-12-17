import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import styled from "styled-components";

export default function Section() {
    const [seats, setSeats] = useState()
    const [name, setName] = useState('Digite seu nome...')
    const [cpf, setCpf] = useState('Digite seu CPF...')
    const { idSessao } = useParams()
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`)
        promise.then(answer => {
            setSeats(answer.data)
        })
    }, [])
    if (!seats) return <h1>Carregando</h1>
    return (
        <>
            <h2>Selecione o(s) assento(s)</h2>
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
                    inplace={name}
                    onChange={e => {
                        setName(e.target.value)
                    }}></input>
                <label>CPF do comprador:</label>
                <input
                    inplace={cpf}
                    onChange={e => {
                        setCpf(e.target.value)
                    }}></input>

                <button>
                    <Link name={name} cpf={cpf} to='/sucesso'>
                        Reservar assentos(s)
                    </Link>
                </button>
            </Chekout>
        </>
    )
}

const Seat = styled.div`
background-color: gray;
width: 25px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
`

const Seats = styled.div`
display:flex;
flex-wrap: wrap;
gap: 5px;
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
`