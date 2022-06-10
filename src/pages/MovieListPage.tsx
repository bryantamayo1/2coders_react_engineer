import { useEffect } from "react";
import { ApiMovie } from "../api/ApiMovie";


export const MovieListPage = () => {
  
  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async() => {
    const data = await ApiMovie.getPopularMovies();
    console.log("movies: ", data);

    const data2 = await ApiMovie.getMovieById(338953);
    console.log("data2: ", data2);
  }

  return (
    <div>MovieListPage</div>
  )
}
