import { BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import { MovieListPage } from "../pages/MovieListPage"
import { MoviePage } from "../pages/MoviePage"

export const AppRoter = () => {
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
