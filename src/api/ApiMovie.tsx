import { URL_API }               from "../utils/Constants";
import { PopularMovies, Movie }  from "../interfaces/MoviesInterface.d";

const apiKey = import.meta.env.VITE_API_KEY_TMDB || "";
const queryAPIKey = "?api_key=" + apiKey;

async function API<T>(path: string, page?: number):Promise<T>{
    let queryPage = "";
    if(page && page !== 0){
        queryPage = "&page=" + page;
    } 
    const resp = await fetch(URL_API + path + queryAPIKey + queryPage);
    if(resp.ok){
        return await resp.json();
    }else{
        throw await resp.json();
    }
}

export class ApiMovie{
    static async getPopularMovies(page: number){
        return await API<PopularMovies>("/movie/popular", page);
    }
    static async getMovieById(id: number){
        return await API<Movie>("/movie/" + id );
    }
}