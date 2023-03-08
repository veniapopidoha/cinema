import React, { useEffect, useState } from 'react';
import styles from '../page.module.css';

const DEFAULT_PLACEHOLDER_IMAGE =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

const MoreInfo = ({ movie }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const poster =
    movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  const fetchData = async () => {
    await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=ef401657`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setData(jsonResponse);
      });
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <div className={styles.moreInfo}>
      <div className={styles.wrap}>
        <h2>{movie.Title}</h2>
        <div>
          <img
            className={styles.poster}
            width='200'
            alt={`The movie titled: ${movie.Title}`}
            src={poster}
          />
        </div>
        {!loading ? (
          <>
            <h3>Rating: {data.imdbRating}</h3>
            <p>({movie.Year})</p>
            <p>Actors: {data.Actors}</p>
            <p>{data.Plot}</p>
          </>
        ) : (
          <h3 className={styles.loading}>Loading...</h3>
        )}
      </div>
    </div>
  );
};

export default MoreInfo;
