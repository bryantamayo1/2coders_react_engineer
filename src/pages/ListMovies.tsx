import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { ApiMovie } from '../api/ApiMovie';
import { PopularMovies } from '../interfaces/MoviesInterface';
import { URL_MOVIE_IMG } from '../utils/Constants';

type ListMoviesState = {
  data: PopularMovies
}
const ListMoviesInitialState:ListMoviesState = {
  data: {} as PopularMovies
}

export const ListMovies = () => {
  const [state, setState] = useState(ListMoviesInitialState as ListMoviesState);
  const sizeImg = "w300"

  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async() => {
    const data = await ApiMovie.getPopularMovies();
    setState(prev => ({ ...prev, data }));
    console.log("movies: ", data);

  }

  return (
    <div className="container-body">

      <ContainerListMovies>
        {state.data.results?.map(item => (
          <CardMovie>
            {item.title}
            {item.release_date}
            {item.popularity}
            <img src={`${URL_MOVIE_IMG}${sizeImg}${item.poster_path}`} width="170"/>
          </CardMovie>
        ))}

      </ContainerListMovies>

    </div>
  )
}

const ContainerListMovies = styled.div`
  border: 1px solid red;
  display: grid;
  grid-row-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 0 auto;
  min-height: calc(100vh - 60px - 60px);
  place-content: center;
  place-items: center;
  width: 80%;
`;
const CardMovie = styled.div`
  border: 1px solid blue;
  box-sizing: border-box;
  height: 250px;
  width: 170px;
`;
