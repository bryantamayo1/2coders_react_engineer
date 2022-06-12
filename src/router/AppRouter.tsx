import { BrowserRouter as Router, Navigate, Route, Routes}  from "react-router-dom"
import { ListMovies }                                       from "../pages/ListMovies";
import { AppPage }                                          from "../pages/AppPage";
import { MoviePage }                                        from "../pages/MoviePage";
import { useEffect, useState }                              from "react";

export const AppRouter = () => {
  // Hooks
  const [activeError, setActiveError] = useState({active: false, message: ""});

  /**
   * Timer to hide alert message
   */
  const timer = setTimeout(() => {
    closeAlert();
  }, 5000);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    }
  },);

  // Handle global errors
  window.addEventListener("unhandledrejection", ({reason}: any) => {
    // Handle error accordinf response of API
    reason.errors? reason.status_message = reason.errors[0] : "";
    reason.status_message? reason.status_message : "Ups! An error occurred, Please try again later.";
    setActiveError({active: true, message: reason.status_message});
    timer;
  });

  const closeAlert = () => setActiveError({active: false, message: ""});

  return (
    <Router>
      {/* Alert error */}
      {activeError.active && (
        <div className="container-error">
          {activeError.message}
          <button className="btn-close" onClick={closeAlert}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

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
