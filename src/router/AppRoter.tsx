import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { MovieListPage } from "../pages/MovieListPage"

export const AppRoter = () => {
  return (
    <Router>
        <Routes>
            <Route path='' element={<MovieListPage/>}/> 
        </Routes>
    </Router>
  )
}
