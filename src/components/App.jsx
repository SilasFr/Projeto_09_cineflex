import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
import MoviesFeed from "./MoviesFeed";
import Movie from './Movie'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MoviesFeed />} />
                <Route path='/:idMovie' element={<Movie />} />
            </Routes>
        </BrowserRouter>
    )
}