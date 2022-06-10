import { URL_API } from "../utils/Constants";
import { PopularMovies } from "./interfaces/MoviesInterface";

const apiKey = import.meta.env.VITE_API_KEY_TMDB || "";
const queryAPIKey = "?api_key=" + apiKey;

async function API<T>(path: string):Promise<T>{
    const resp = await fetch(URL_API + path + queryAPIKey);
    if(resp.ok){
        return await resp.json();
    }else{
        throw await resp.json();
    }
}

export class ApiMovie{
    static async getPopularMovies(){
        return await API<PopularMovies>("/movie/popular");
    }
    static async getMovieById(id: number){
        return await API("/movie/" + id );
    }
}