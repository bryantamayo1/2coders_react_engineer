import moment                               from 'moment';
import { useEffect, useState }              from 'react'
import { useNavigate, useParams }           from 'react-router-dom'
import styled                               from 'styled-components';
import { ApiMovie }                         from '../api/ApiMovie';
import { Movie }                            from '../interfaces/MoviesInterface.d';
import { formatDateSpanish, URL_MOVIE_IMG } from '../utils/Constants';

type MoviePageState = {
  data: Movie,
  limitLettersOfOverview: boolean     // if >= 500 change height iamge to get nice responsive
}

const MoviePageInitialState:MoviePageState = {
  data: {} as Movie,
  limitLettersOfOverview: false
}

export const MoviePage = () => {
  // Hooks
  const [state, setState] = useState(MoviePageInitialState as MoviePageState);
  const {id} = useParams();
  const navigate = useNavigate();

  // Constants
  const sizeImg = "w1280";   // Size with img of movie

  useEffect(() => {
    if(!id){
      navigate("/");
    }
    //@ts-ignore
    getMovieById(+id);
  }, []);
  
  const getMovieById = async(id: number) => {
    let limitLettersOfOverview = state.limitLettersOfOverview;
    const data = await ApiMovie.getMovieById(id);
    data.release_date = moment(data.release_date).format(formatDateSpanish);  // Change format date  
    data.tagline = data.tagline.slice( 0, data.tagline.lastIndexOf("."));     // Delete dot

    // Fix size according to count letters of data.overview. E.g. movie id = 371370  "Looking Back at it All: The Dragon Ball Z Year-End Show!"
    data.backdrop_path = data.backdrop_path? data.backdrop_path : data.poster_path;
    if(data.overview.length >= 500){
      limitLettersOfOverview = true;
    }
    setState(prev => ({ ...prev, data, limitLettersOfOverview }));
  }

  return (
    <ContainerMovie>
      {state.data.backdrop_path && (
        <ContainerMovieBackground 
          src={`${URL_MOVIE_IMG}${sizeImg}${state.data.backdrop_path}`}
          limitLettersOfOverview={state.limitLettersOfOverview}
        />
      )}
      <ContainerInfo>
        <CardInfo>
          <div style={{ marginBottom: 60 }}>
            <Title>{state.data.title}</Title>
            <TagLine>{state.data.tagline}</TagLine>
          </div>

          <FirstInfo>
            <span>{state.data.release_date}</span>
            <ContainerItem>
              <i className="fa-regular fa-clock"></i>
              <span>{state.data.runtime}'</span>
            </ContainerItem>
         
            <ContainerItem>
              <i className="fa-solid fa-language"></i>
              {state.data.spoken_languages?.map( (item, index) => (
                <>
                  <span>{item.english_name}</span>
                  {state.data.spoken_languages.length -1 !== index && <Bar/>}
                </>
              ))}
            </ContainerItem>
          </FirstInfo>

          <SecondInfo>
            {state.data.genres?.map(item =>(
              <GenreMovie>{item.name}</GenreMovie>
            ))}
          </SecondInfo>

          <ThirdInfo>
            <span>
              <i className="fa-solid fa-star star-icon fa-sm" style={{ marginRight: 5 }}></i>
              {state.data.vote_average}
            </span>
            <span>
              Votes: {state.data.vote_count}
            </span>
          </ThirdInfo>

          <Description>
              {state.data.overview}
          </Description>

        </CardInfo>
      </ContainerInfo>
    </ContainerMovie>

  )
}
const ContainerMovie = styled.div`
  min-height: calc(100vh - 60px - 60px);
  position: relative;
`;
const ContainerMovieBackground = styled.div<{src: string, limitLettersOfOverview: boolean}>`
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 100%), url(${props => props.src});
  background-position: center;
  background-size: cover;
  height: calc(100vh - 60px - 60px);
  position: relative;

  @media (max-width: 768px){
    height: ${ prev => prev.limitLettersOfOverview? "calc(100vh + 300px)" : "calc(100vh - 60px - 60px)"};
  }
  @media(max-width: 600px){
    height: ${ prev => prev.limitLettersOfOverview? "calc(100vh + 500px)" : "100vh"};
  }
  @media(max-width: 480px){
    height: ${ prev => prev.limitLettersOfOverview? "calc(100vh + 700px)" : "calc(100vh + 200px)"};
  }
`;
const ContainerInfo = styled.div`
  bottom: 0;
  margin: 0 auto;
  position: absolute;
  width: 100%;
`;
const CardInfo = styled.div`
  margin: 0 auto;
  width: 80%;

  @media(max-width: 600px){
    width: 90%;
  }
`;
const Title = styled.p`
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0px;
`;
const TagLine = styled.p`
  margin: 5px 0px;
  text-align: center;
`;
const FirstInfo = styled.div`
  column-gap: 10px;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 10px 30px;
`;
const Bar = styled.span`
  background-color: #FFF;
  height: 100%; 
  width: 1px;
`;
const ContainerItem = styled.span`
  align-items: center;
  display: flex;
  column-gap: 8px;
`;
const SecondInfo= styled.div`
  column-gap: 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  padding: 15px 0px;
  row-gap: 10px;
`;
const GenreMovie = styled.span`
  border: 1px solid #FFF;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 4px 10px;
`;
const ThirdInfo = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 10px 30px;
  font-size: 14px;
  padding: 5px 0px;
`;
const Description = styled.p`
  line-height: 20px;
`;