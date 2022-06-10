import { BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import { MovieListPage } from "../pages/MovieListPage"
import { MoviePage } from "../pages/MoviePage"

export const AppRoter = () => {

  // Handle error
  window.addEventListener("unhandledrejection", ({reason}: any) => {
    console.log("Ups An error has ocurred. Please try again later")
  });

  return (
    <Router>
        <Routes>
            <Route path='' element={<MovieListPage/>}/> 
            <Route path='movie' element={<MoviePage/>}/> 
            <Route path='*' element={<Navigate to=''/>}/> 
        </Routes>
    </Router>
  )
}
