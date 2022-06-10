import React from 'react'
import styled from 'styled-components';

export const Footer = () => {
  return (
    <ContainerFooter>
        &copy; MyMovies 2022. All rights reserved.
    </ContainerFooter>
  )
}

const ContainerFooter = styled.div`
    height: 60px;
    font-size: 12px;
    text-align: center;
`;
