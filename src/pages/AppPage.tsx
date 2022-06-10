import { useEffect } from "react";
import { ApiMovie } from "../api/ApiMovie";
import styled from 'styled-components';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";


export const AppPage = () => {
  
  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async() => {
    const data = await ApiMovie.getPopularMovies();
    console.log("movies: ", data);

    const data2 = await ApiMovie.getMovieById(338953);
    console.log("data2: ", data2);
  }

  return (
    <ContainerApp>
      <Header/>
      <Outlet/>
      <Footer/>
    </ContainerApp>
  )
}

const ContainerApp = styled.div`
  background-color: #000;
  color: #FFF;
  min-height: 100vh;
`;
