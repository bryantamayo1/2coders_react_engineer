import React from 'react'
import styled from 'styled-components';

export const Footer = () => {
  return (
    <ContainerFooter>
        <Title>
            &copy; MyMovies 2022. All rights reserved.
        </Title>
    </ContainerFooter>
  )
}

const ContainerFooter = styled.div`
    height: 60px;
    font-size: 12px;
    position: relative;
`;
const Title = styled.div`
    position: relative;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
`;
