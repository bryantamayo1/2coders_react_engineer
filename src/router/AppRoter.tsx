import { BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import { ListMovies } from "../pages/ListMovies";
import { AppPage } from "../pages/AppPage"
import { MoviePage } from "../pages/MoviePage"

export const AppRoter = () => {

  // Handle global errors
  window.addEventListener("unhandledrejection", ({reason}: any) => {
    console.log("Ups An error has ocurred. Please try again later")
  });

  return (
    <Router>
        <Routes>
            <Route path='' element={<AppPage/>}>
              <Route path='/' element={<ListMovies/>}/> 
              <Route path='/movie/:id' element={<MoviePage/>}/> 
              <Route path='*' element={<Navigate to=''/>}/>   
            </Route> 
        </Routes>
    </Router>
  )
}
