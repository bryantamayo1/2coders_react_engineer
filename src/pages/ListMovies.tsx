import React, { useEffect } from 'react'
import styled from 'styled-components';
import { ApiMovie } from '../api/ApiMovie';

export const ListMovies = () => {

  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async() => {
    const data = await ApiMovie.getPopularMovies();
    console.log("movies: ", data);

  }


  return (
    <div className="container-body">

      <ContainerListMovies>
        123

      </ContainerListMovies>

    </div>
  )
}

const ContainerListMovies = styled.div`
  border: 1px solid red;
  margin: 0 auto;
  width: 80%;
`;
