import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Success({seats, ticket, name, cpf}) {
    console.log(ticket)
    const ids = ticket.map(item=> item.id)
    const postRequest = {
        ids: ids,
        name: name,
        cpf: cpf
    }

    useEffect(()=>{
        const promise = axios.post('https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many', postRequest)
        promise.catch(answer=>{
            alert(answer.status)
        })
        promise.then(answer=> {
            alert('Seus assentos foram reservados com sucesso!')
        })
    }, [])
    return (
        <Container>
            <Title>Pedido feito com sucesso!</Title>
            <div>
                <Subtitle>Filme e sessão</Subtitle>
                <p> {seats.day.date} </p>
                <p> {seats.name} </p>
            </div>
            <div>
                <Subtitle>Ingressos</Subtitle>
                {ticket.map(item=>{
                    return(
                        <p key={item.id}>{`Assento ${item.name}`}</p>
                    )})}
            </div>
            <div>
                <Subtitle>Comprador</Subtitle>
                <p>Nome:{ name }</p>
                <p>CPF: { cpf }</p>
            </div>

            <Home>
                <Link to='/'>
                    Voltar para Home
                </Link>
            </Home>
        </Container>

    )
}

const Container = styled.div`
padding: 29px;
display: flex;
flex-direction: column;
gap: 50px;
`

const Title = styled.h1`
font-weight: bold;
font-size: 24px;
line-height: 28px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.04em;

color: #247A6B;
`

const Subtitle = styled.h2`
font-weight: bold;
font-size: 24px;
line-height: 28px;
display: flex;
align-items: center;
letter-spacing: 0.04em;

color: #293845;
`

const Home = styled.button`
margin: 0 auto;
background-color: orange;
border: none;
width: 225px;
height: 42px;

background: #E8833A;
border-radius: 3px;

a{
    text-decoration: none;
    color: #fff;
}
`