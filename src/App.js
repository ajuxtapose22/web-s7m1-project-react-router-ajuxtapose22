import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom'
import SavedList from './Movies/SavedList';
import MovieList from "./Movies/MovieList";
import Movie from './Movies/Movie';

export default function App () {
  const [savedList, setSavedList] = useState([]); // Stretch: the ids of "saved" movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5001/api/movies') // Study this endpoint with Postman
        .then(response => {
          setMovies(response.data)
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movies' slice of state
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    if (!savedList.some(savedMovie => savedMovie.id === movie.id)) {
      setSavedList([...savedList, movie]);
    }
    // This is stretch. Prevent the same movie from being "saved" more than once
  };

  return (

    <div>
      <SavedList list={savedList} />

      <Routes>
        <Route path="/" element={<MovieList movies={movies}/>} />
        <Route path="movies/:id" element={<Movie addToSavedList={addToSavedList}/>} />
      </Routes>
    </div>
  );
}
