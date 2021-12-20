import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from 'react'
import MoviesFeed from "./MoviesFeed"
import Movie from './Movie'
import React from "react";
import Section from "./Section"
import Success from "./Success";
import styled from "styled-components";

export default function App() {
    const [seats, setSeats] = useState()
    const [ticket, setTicket] = useState()
    const [name, setName] = useState('Digite seu nome...')
    const [cpf, setCpf] = useState('Digite seu CPF...')
    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route path='/' element={<MoviesFeed />} />
                <Route path='/filme/:idMovie' element={<Movie />} />
                <Route
                    path='/sessao/:idSessao'
                    element={<Section
                        setName={setName}
                        setCpf={setCpf}
                        seats={seats}
                        setSeats={setSeats}
                        ticket={ticket}
                        setTicket={setTicket} />} />
                <Route
                    path='/sucesso'
                    element={<Success
                        name={name}
                        cpf={cpf}
                        seats={seats}
                        ticket={ticket} />} />
            </Routes>
        </BrowserRouter>
    )
}

function TopBar() {
    return (
        <Header>
            <h1>CINEFLEX</h1>
        </Header>
    )
}

const Header = styled.div`
    width:100%;
    height:67px;
    display:flex;
    justify-content: center;
    align-items:center;
    background-color:#C3CFD9;
    h1{
        color:#E8833A;
        font-weight: normal;
    }
`