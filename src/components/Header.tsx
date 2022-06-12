import { useContext } from 'react';
import { Link }       from 'react-router-dom';
import styled         from 'styled-components';
import { AppContext } from '../context/AppContext';

export const Header = () => {
  const {changeTheme, theme} = useContext(AppContext);

  return (
    <ContainerHeader>
        <Link to="/?page=1" className='link' style={theme}>
            <i className="fa-solid fa-clapperboard" style={{ marginRight: 10 }}></i>
            MyMovies
        </Link>
        <div>
            Login
            <i className="fa-solid fa-arrow-right-to-bracket" style={{ marginLeft: 10 }}></i>
            <BtnTheme onClick={changeTheme} theme={theme}>
              <i className="fa-regular fa-sun"></i>
            </BtnTheme>
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
const BtnTheme = styled.button`
  background-color: ${prev => prev.theme.backgroundColor};
  border: 1px solid ${prev => prev.theme.backgroundColor};
  box-sizing: border-box;
  color: ${prev => prev.theme.color};
  cursor: pointer;
  margin-left: 10px;
`;