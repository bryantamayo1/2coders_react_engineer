import { useContext, useEffect, useState }    from 'react'
import styled                                 from 'styled-components';
import { ApiMovie }                           from '../api/ApiMovie';
import { PaginationInfo, PopularMovies, StyleProps }      from '../interfaces/MoviesInterface.d';
import { formatDateSpanish, URL_MOVIE_IMG }   from '../utils/Constants';
import moment                                 from 'moment';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Spinner }                            from '../components/Spinner';
import { AppContext } from '../context/AppContext';

type ListMoviesState = {
  data: PopularMovies,
  paginationInfo: PaginationInfo[],
  activeSpinner: boolean
}
interface ButtonSelectProps extends StyleProps{
  active?: boolean
}
const ListMoviesInitialState:ListMoviesState = {
  data: {} as PopularMovies,                        // Popular movies of API
  paginationInfo: [{ active: true, page: 1 }],       // Default page = 1
  activeSpinner: false
}

export const ListMovies = () => {
  // Hooks
  const {theme} = useContext(AppContext);
  const [state, setState] = useState(ListMoviesInitialState as ListMoviesState);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  // Constants
  const sizeImg = "w300";   // Size with img of backend
  const buttonsPaginationLength =  5;

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
   * Get popular movies and calculate pagination: buttons and page actived page
   * @params {number} page query pagination
   */
  const getPopularMovies = async(page: number) => {
    setSearchParams({page: ""+page});                                       // Set up query page
    setState(prev => ({ ...prev, activeSpinner: true }));   // Active spinner
    try{
      const data = await ApiMovie.getPopularMovies(page);
      data.results.forEach(item => {
        item.release_date = moment(item.release_date).format(formatDateSpanish);   // Change format date
        item.popularity = +(item.popularity / 1000).toFixed(1);               // Change format popularity
      });
  
      // Calculate pagination
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
      setState(prev => ({ ...prev, data, paginationInfo, activeSpinner: false }));
    }finally{
      // In case request fail disabled spinner
      setState(prev => ({ ...prev, activeSpinner: false }));
    }
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
      <Spinner active={state.activeSpinner}>
      <ContainerOptionMovies>
        <Link to="?page=1" style={{ textDecoration: "none" }}>
          <ButtonSelect theme={theme}>Popular</ButtonSelect>
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
                </StarMovie>
              </ContainerInfoMovie>
            </ContainerMovie>
          </Link>
        ))}
      </ContainerListMovies>

      {state.paginationInfo.length !== 1 && (
        <ContainerPagintation>
            {state.paginationInfo[0]?.page !== 1 && <MovePagination onClick={() => movePage(-1)} theme={theme}>{"<"}</MovePagination>}
            {state.paginationInfo.map( ({active, page}) => (
              <Link to={`?page=${page}`} key={page} style={theme}>
                <PaginateButton active={active} theme={theme}>
                  {page}
                </PaginateButton>
              </Link>
            ))}
            <MovePagination onClick={() => movePage(1)} theme={theme}>{">"}</MovePagination>
        </ContainerPagintation>
      )}
      </Spinner>
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
const ButtonSelect = styled.span<ButtonSelectProps>`
  background-color: ${prev => prev.theme.color};
  border: 1px solid ${prev => prev.theme.backgroundColor};
  color: ${prev => prev.theme.backgroundColor};
  border-radius: 15px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${props => props.active? "bold" : "normal"};
  padding: 2px 10px;
  transition: all 0.3s;
  
  &:hover{
    font-weight: bold;
  }
`;
const ContainerListMovies = styled.div`
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

  @media(max-width: 768px){
    width: 90%;
  }
  @media(max-width: 480px){
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
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
  @media(max-width: 480px){
    // Aspect ratio 1.5
    height: 405px;
    width: 270px;
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
  font-weight: bold;
  margin: 5px 0px;
`;
const ReleaseDateMovie = styled.p`
  font-size: 10px;
  margin: 5px 0px;
`;
const StarMovie = styled.p`
  font-size: 13px;
  margin: 3px 0px;
`;
const ContainerPagintation= styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px auto;
  row-gap: 10px;
  text-align: center; 
  width: 80%;
`;
const PaginateButton = styled.div<{active?: boolean}>`
  background-color: ${prev => {
    if(prev.theme.theme === "dark"){
      return prev.active? prev.theme.color : prev.theme.backgroundColor;
    }else{
      return prev.active? prev.theme.backgroundColor : prev.theme.color;
    }
  }};
  color: ${prev => {
    if(prev.theme.theme === "dark"){
      return prev.active? prev.theme.backgroundColor : prev.theme.color;
    }else{
      return prev.active? prev.theme.color : prev.theme.backgroundColor;
    }
  }};
  border: 1px solid ${prev => prev.theme.color};
  border-radius: 100%;
  display: inline-block;
  height: 35px;
  line-height: 35px;
  margin: 0px 5px;
  width: 35px;
`;
const MovePagination = styled.button`
  background-color: ${prev => prev.theme.backgroundColor};
  border: 1px solid ${prev => prev.theme.backgroundColor};
  box-sizing: border-box;
  color: ${prev => prev.theme.color};
  cursor: pointer;
`;
