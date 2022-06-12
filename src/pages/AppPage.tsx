import styled     from 'styled-components';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";


export const AppPage = () => {
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
