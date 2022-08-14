import { useEffect, useState } from "react";
import { API_URL } from "../../const/urls";
import { IMovie } from "../../interfaces/movie.interface";
import MovieCard from "../MovieCard/MovieCard";
import "../Section01/section01.css";
import axios from "axios";

export default function Section01() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section className="section01">
      <div className="movies">
        {!!movies.length && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </section>
  );
}
