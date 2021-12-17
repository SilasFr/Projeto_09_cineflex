import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import MoviesFeed from "./MoviesFeed"
import Movie from './Movie'
import React from "react";
import Section from "./Section"
import Success from "./Success";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MoviesFeed />} />
                <Route path='/filme/:idMovie' element={<Movie />} />
                <Route path='/sessao/:idSessao' element={<Section />} />
                <Route path='/sucesso' element={<Success />} />
            </Routes>
        </BrowserRouter>
    )
}