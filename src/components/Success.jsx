import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Success({seats, ticket, name, cpf}) {
    console.log(seats)
    console.log(ticket)
    return (
        <>
            <h1>Pedido feito com sucesso!</h1>
            <div>
                <h2>Filme e sessão</h2>
                <p> {seats.day.date} </p>
                <p> {seats.name} </p>
            </div>
            <div>
                <h2>Ingressos</h2>
                <p></p>
                <p></p>
            </div>
            <div>
                <h2>Comprador</h2>
                <p>Nome:{ name }</p>
                <p>CPF: { cpf }</p>
            </div>

            <Home>
                <Link to='/'>
                    Voltar para Home
                </Link>
            </Home>
        </>

    )
}

const Home = styled.button`
background-color: orange;
border: none;
border-radius: 8px;
width: 225px;
height:25px;
a{
    text-decoration: none;
    color: #fff;
}
`