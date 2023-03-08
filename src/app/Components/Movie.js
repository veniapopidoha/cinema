import React, { useState } from 'react';
import styles from '../page.module.css';
import MoreInfo from './MoreInfo';

const DEFAULT_PLACEHOLDER_IMAGE =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

const Movie = ({ movie }) => {
  const [isMore, setIsMore] = useState(false);

  const poster =
    movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  const moreInfo = () => {
    setIsMore(!isMore);
  };

  return (
    <div className={styles.movie} onClick={() => moreInfo()}>
      <h2>{movie.Title}</h2>
      <div>
        <img
          className={styles.poster}
          width='200'
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>({movie.Year})</p>
      {isMore && <MoreInfo movie={movie} />}
    </div>
  );
};

export default Movie;
