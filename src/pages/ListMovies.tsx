import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { ApiMovie } from '../api/ApiMovie';
import { PopularMovies } from '../interfaces/MoviesInterface';
import { URL_MOVIE_IMG } from '../utils/Constants';
import moment from 'moment';

type ListMoviesState = {
  data: PopularMovies
}
const ListMoviesInitialState:ListMoviesState = {
  data: {} as PopularMovies
}

export const ListMovies = () => {
  const [state, setState] = useState(ListMoviesInitialState as ListMoviesState);
  const sizeImg = "w300";   // Size with img og backend

  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async() => {
    const data = await ApiMovie.getPopularMovies();
    data.results.forEach(item => {
      item.release_date = moment(item.release_date).format("DD/MM/YYYY");   // Change format date
      item.popularity = +(item.popularity / 1000).toFixed(1);               // Change format popularity
    });
    setState(prev => ({ ...prev, data }));
    console.log("movies: ", data);

  }

  return (
    <div className="container-body">

      <ContainerListMovies>
        {state.data.results?.map(item => (
          <div style={{ overflow: "hidden" }}>
            <CardMovie src={`${URL_MOVIE_IMG}${sizeImg}${item.poster_path}`} key={item.id}>
              <ContainerInfoMovie>
                <TitleMovie>
                  {item.title}
                </TitleMovie>
                <ReleaseDateMovie>
                  {item.release_date}
                </ReleaseDateMovie>
                <StarMovie>
                  <i className="fa-solid fa-star star-icon fa-sm" style={{ marginRight: 5 }}></i>
                  {item.popularity}
                  {/* <i className="fa-solid fa-star-half-stroke star-icon" ></i> */}
                </StarMovie>
              </ContainerInfoMovie>
            </CardMovie>

          </div>
        ))}

      </ContainerListMovies>

    </div>
  )
}

const ContainerListMovies = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  display: grid;
  grid-row-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 0 auto;
  min-height: calc(100vh - 60px - 60px);
  padding: 20px 0px;
  place-content: center;
  place-items: center;
  width: 80%;
`;
const CardMovie = styled.div<{src: string}>`
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  /* border: 1px solid blue; */
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  height: 255px;
  position: relative;
  transition: all 0.5s;
  width: 170px;

  &:hover{
    transform: scale(1.1);
  }
`;
const ContainerInfoMovie = styled.div`
  background: rgba(52, 52 ,52, 0.7);
  bottom: 0;
  box-sizing: border-box;
  padding: 0px 10px;
  position: absolute;
  width: 100%;
`;
const TitleMovie = styled.p`
  margin: 5px 0px;
  font-weight: bold;
`;
const ReleaseDateMovie = styled.p`
  margin: 5px 0px;
  font-size: 10px;
`;
const StarMovie = styled.p`
  margin: 3px 0px;
  font-size: 13px;
`;
