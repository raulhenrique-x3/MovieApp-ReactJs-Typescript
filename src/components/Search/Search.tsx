import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IMovie } from "../../interfaces/movie.interface";
import style from "../Search/search.module.scss";
import axios from "axios";
import "../Section01/section01.css";
import { API_KEY } from "../../const/common";
import MovieCard from "../MovieCard/MovieCard";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [movies, setMovies] = useState<IMovie[]>([]);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, [query]);

  return (
    <section className="section01">
      <h1 className={style.results}>
        RESULTADOS PARA: <br />
        <span className={style.spanName}>{query}</span>
      </h1>
      <div className="movies">
        {!!movies.length && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </section>
  );
};

export default Search;
