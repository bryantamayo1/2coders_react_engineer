import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Header = () => {
  return (
    <ContainerHeader>
        <Link to="/" className='logo-link'>
            <i className="fa-solid fa-clapperboard" style={{ marginRight: 10 }}></i>
            MyMovies
        </Link>
        <div>
            Login
            <i className="fa-solid fa-arrow-right-to-bracket" style={{ marginLeft: 10 }}></i>
        </div>
    </ContainerHeader>
  )
}

const ContainerHeader = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Fredoka+One');
    align-items: center;
    display: flex;
    font-family: 'Fredoka One', cursive;
    height: 60px;
    justify-content: space-between;
    letter-spacing: 1px;
    margin: 0 auto;
    width: 80%;
`;