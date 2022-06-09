import { URL_API } from "../utils/Constants";

const apiKey = import.meta.env.VITE_API_KEY_TMDB || "";
const queryAPIKey = "?api_key=" + apiKey;

export class ApiMovie{
    static async getPopularMovies(){
        const resp = await fetch(URL_API + "/movie/popular/" + queryAPIKey );
        return await resp.json();
    }
    static async getMovieById(id: number){
        const resp = await fetch(URL_API + "/movie/" + id + queryAPIKey);
        return await resp.json();
    }
}