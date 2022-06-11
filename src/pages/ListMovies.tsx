import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { ApiMovie } from '../api/ApiMovie';
import { PaginationInfo, PopularMovies } from '../interfaces/MoviesInterface';
import { URL_MOVIE_IMG } from '../utils/Constants';
import moment from 'moment';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

type ListMoviesState = {
  data: PopularMovies,
  paginationInfo: PaginationInfo[]
}
const ListMoviesInitialState:ListMoviesState = {
  data: {} as PopularMovies,                        // Popular movies of API
  paginationInfo: [{ active: true, page: 1 }]       // Default page = 1
}

export const ListMovies = () => {
  // Hooks
  const [state, setState] = useState(ListMoviesInitialState as ListMoviesState);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  // Constants
  const sizeImg = "w300";   // Size with img of backend
  const buttonsPaginationLength =  5;
  const maxPagesOfPagination = 500;

  useEffect(() => {
    const pageQuery = searchParams.get("page") || state.paginationInfo[0].page;
    getPopularMovies(+pageQuery);
  }, []);

  // Default pagination when logo app is clicked
  useEffect(() => {
    const page = (new URLSearchParams(location.search)).get("page") || 1;
    if(!isNaN(+page)){
      getPopularMovies(+page);
    }else{
      getPopularMovies(1);
    } 
  }, [location.search]);

  /**
   * @params {number} page query pagination
   */
  const getPopularMovies = async(page: number) => {
    setSearchParams({page: ""+page});                                       // Set up query page
    const data = await ApiMovie.getPopularMovies(page);
    data.results.forEach(item => {
      item.release_date = moment(item.release_date).format("DD/MM/YYYY");   // Change format date
      item.popularity = +(item.popularity / 1000).toFixed(1);               // Change format popularity
    });
    // Calculate pagination

    console.log({page})
    let paginationInfo:PaginationInfo[] = [];
    let indexStartPagination = 1;
    const rest = page % buttonsPaginationLength;
    if(rest){
      indexStartPagination = page - rest + 1;
    }else{
      indexStartPagination = page - buttonsPaginationLength + 1;
    }
    for(let i = indexStartPagination; i < indexStartPagination + buttonsPaginationLength; i++){
      paginationInfo.push({
        page: i,
        active: i === page
      });
    }
    // const paginationInfo = state.paginationInfo;
    setState(prev => ({ ...prev, data, paginationInfo }));
  }

  /**
   * Get 5 more o 5 less pages
   * @param {number} page It can be +1 | -1
   */
  const movePage = (page: number) => {
    const paginationInfo = state.paginationInfo;
    const pageCurrent = (new URLSearchParams(location.search)).get("page") || 1;
    paginationInfo.forEach(item => {
      item.active = false;
      if(page === 1){
        item.page = item.page + buttonsPaginationLength;
      }else{
        item.page = item.page - buttonsPaginationLength;
      }
    });

    // Keep  default active page
    const pageFound = paginationInfo.find(item => item.page === +pageCurrent);
    if(pageFound){
      paginationInfo.forEach(item => {if(item.page === pageFound.page) item.active = true});
    }
    setState(prev => ({ ...prev, paginationInfo }))
  }

  return (
    <div className="container-body">
      <ContainerOptionMovies>
        <Link to="?page=1" style={{ textDecoration: "none" }}>
          <ButtonSelect active>Popular</ButtonSelect>
        </Link>
        <ButtonSelect>Top Rated</ButtonSelect>
      </ContainerOptionMovies>

      <ContainerListMovies>
        {state.data.results?.map(item => (
          <Link to={`/movie/${item.id}`} style={{ textDecoration: "none", color: "#FFF" }} key={item.id}>
            <ContainerMovie>
              <CardImg src={`${URL_MOVIE_IMG}${sizeImg}${item.poster_path}`} />
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
            </ContainerMovie>
          </Link>
        ))}
      </ContainerListMovies>

      <ContainerPagintation>
          {state.paginationInfo[0]?.page !== 1 && <MovePagination onClick={() => movePage(-1)}>{"<"}</MovePagination>}
          {state.paginationInfo.map( ({active, page}) => (
            <Link to={`?page=${page}`}>
              <PaginateButton border active={active} key={page}>
                {page}
              </PaginateButton>
            </Link>
          ))}
          <MovePagination onClick={() => movePage(1)}>{">"}</MovePagination>
      </ContainerPagintation>

    </div>
  )
}

const ContainerOptionMovies = styled.div`
  display: flex;
  justify-content: start;
  column-gap: 20px;
  margin: 5px auto;
  width: 80%;
`;
const ButtonSelect = styled.span<{active?: boolean}>`
  background-color: ${props => props.active? "#FFF" : "#000"};
  color: ${props => props.active? "#000" : "#FFF"};
  border: 1px solid #FFF;
  border-radius: 15px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${props => props.active? "bold" : "normal"};
  padding: 2px 10px;
  transition: all 0.3s;
  
  &:hover{
    color: #000;
    background-color: #FFF;
  }
`;
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
const ContainerMovie = styled.div`
  border-radius: 5px;
  overflow: hidden;
  position: relative; 
`;
const CardImg = styled.div<{src: string}>`
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  height: 255px;
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
const ContainerPagintation= styled.div`
  margin: 10px auto;
  text-align: center;
  width: 80%;
`;
const PaginateButton = styled.div<{border?: boolean, active?: boolean}>`
  background-color: ${props => props.active? "#FFF" : "#000"};
  color: ${props => props.active? "#000" : "#FFF"};
  cursor: pointer;
  border: ${props => props.border? "1px solid #FFF" : "none"};
  border-radius: 100%;
  display: inline-block;
  height: 35px;
  line-height: 35px;
  margin: 0px 5px;
  width: 35px;
`;
const MovePagination = styled.button`
  background-color: #000;
  color: #FFF;
  cursor: pointer;
`;
