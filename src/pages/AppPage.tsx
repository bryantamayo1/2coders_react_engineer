import styled         from 'styled-components';
import { Header }     from "../components/Header";
import { Footer }     from "../components/Footer";
import { Outlet }     from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { StyleProps } from '../interfaces/MoviesInterface.d';

export const AppPage = () => {
  const {theme} = useContext(AppContext);

  return (
    <ContainerApp theme={theme}>
      <Header/>
      <Outlet/>
      <Footer/>
    </ContainerApp>
  )
}

const ContainerApp = styled.div<StyleProps>`
  background-color: ${prev => prev.theme.backgroundColor};
  color: ${prev => prev.theme.color};
  min-height: 100vh;
`;
