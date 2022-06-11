import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ApiMovie } from '../api/ApiMovie';

export const MoviePage = () => {
  const {id} = useParams();

  useEffect(() => {
    getMovieById();
  }, []);
  
  const getMovieById = async() => {
    //@ts-ignore
    const data = await ApiMovie.getMovieById(id);
    console.log("modie by id: ", data);
  }
  

  return (
    <div className="container-body">
      Card
    </div>
  )
}
