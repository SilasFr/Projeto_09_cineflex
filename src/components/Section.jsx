import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import styled from "styled-components";

export default function Section({
  seats,
  setSeats,
  ticket,
  setTicket,
  setCpf,
  setName,
}) {
  const { idSessao } = useParams();
  const [allSeats, setAllSeats] = useState([]);
  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`
    );
    promise.then((answer) => {
      setSeats(answer.data);
      setAllSeats(
        answer.data.seats.map((item) => ({ ...item, isSelected: false }))
      );
    });
  }, []);

  if (!seats || !allSeats) return <h1>Carregando</h1>;

  function select(e) {
    const selectedSeat = parseInt(e.target.lastChild.innerText);
    const newSeat = allSeats.map((item) => {
      if (item.id === selectedSeat && !item.isAvailable) {
        alert("Esse assento não está disponível");
      } else if (item.id === selectedSeat && item.isAvailable) {
        item.isSelected = !item.isSelected;
      }
      return item;
    });
    setAllSeats(newSeat);
  }

  return (
    <>
      <Header>Selecione o(s) assento(s)</Header>
      <Seats>
        {allSeats.map((seat) => {
          return (
            <Seat
              onClick={select}
              className={
                seat.isSelected
                  ? "selected"
                  : seat.isAvailable
                  ? "available"
                  : "unavailable"
              }
              key={seat.id}
            >
              {seat.name}
              <span>{seat.id}</span>
            </Seat>
          );
        })}
      </Seats>
      <Caption>
        <div>
          <Ball className="selected"></Ball>
          <p>Selecionado</p>
        </div>
        <div>
          <Ball className="available"></Ball>
          <p>Disponível</p>
        </div>
        <div>
          <Ball className="unavailable"></Ball>
          <p>Indisponível</p>
        </div>
      </Caption>
      <Chekout>
        <label>Nome do comprador:</label>
        <input
          inplace="Digite seu nome..."
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <label>CPF do comprador:</label>
        <input
          inplace="Digite seu CPF"
          onChange={(e) => {
            setCpf(e.target.value);
          }}
        ></input>

        <button>
          <Link
            to="/sucesso"
            onClick={() => {
              setTicket(allSeats.filter((item) => item.isSelected === true));
            }}
          >
            Reservar assentos(s)
          </Link>
        </button>
      </Chekout>
      <Footer
        movie={seats.movie}
        date={seats.day.date}
        time={seats.name}
      ></Footer>
    </>
  );
}

function Footer({ movie, date, time }) {
  return (
    <FooterDiv>
      <Poster>
        <img src={movie.posterURL} alt={movie.title} />
      </Poster>
      <MovieTitle>
        <p>{movie.title}</p>
        <p>{`${date} - ${time}`}</p>
      </MovieTitle>
    </FooterDiv>
  );
}

const Header = styled.p`
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
`;

const Seat = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid #808f9d;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: 0.04em;
  span {
    display: none;
  }
`;

const Seats = styled.div`
  margin: 0 auto;
  width: 327px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 7px;
  &:focus {
    background: #8dd7cf;
  }
`;
const Caption = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Ball = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const Chekout = styled.div`
  display: flex;
  gap: 5px;
  padding: 40px;
  align-items: center;
  flex-direction: column;

  button {
    width: 225px;
    height: 42px;
    margin: 50px auto 0 auto;
    border: none;
    color: #fff;
    font-weight: bold;
    border-radius: 6px;
    background-color: orange;
  }
  label {
    color: #293845;
    font-size: 18px;
    line-height: 21px;
    width: 327px;
  }
  input {
    width: 327px;
    height: 51px;
    border: 1px solid #d4d4d4;
    border-radius: 3px;
  }
`;
const FooterDiv = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 117px;
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #dfe6ed;
`;
const Poster = styled.div`
  width: 64px;
  height: 89px;
  padding: 8px;
  margin-left: 10px;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
  }
`;
const MovieTitle = styled.div`
  font-size: 26px;
  line-height: 30px;
  p {
    width: 100%;
    overflow: hidden;
    word-break: break;
  }
`;
