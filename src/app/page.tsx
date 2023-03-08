'use client';

import styles from './page.module.css';
import React, { useReducer, useEffect } from 'react';
import Header from './Components/Header';
import Movie from './Components/Movie';
import Search from './Components/Search';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=6f8ac3fc';

// export interface IMovie {
//   title: string,
//   poster: string,
//   year: number,
// }

//  interface StateInterface {
//   loading: true,
//   movies: Array<IMovie> | null,
//   errorMessage: null,
// };


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.Search ,
        });
      });
  }, []);

  const search = (searchValue: any) => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=6f8ac3fc`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === 'True') {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.Search,
          });
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            error: jsonResponse.Error,
          });
        }
      });
  };

  
  const { movies, errorMessage, loading } = state;
  return (
    <div className={styles.App}>
      <Header text='Search film...' />
      <Search search={search} />
      <div className={styles.movies}>
        {loading && !errorMessage ? (
          <span className={styles.loading}>loading... </span>
        ) : errorMessage ? (
          <div className={styles.errorMessage}>{errorMessage}</div>
        ) : (
          movies.map((movie: any, index: any) => (
            <Movie
              key={`${index}-${movie.Title}`}
              movie={movie}
            />
          ))
        )}
      </div>
    </div>
  );
}
