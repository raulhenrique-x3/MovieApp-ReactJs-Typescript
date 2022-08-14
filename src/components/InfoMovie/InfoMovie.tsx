import { formatDate } from "../../util/formatDate";
import { API_IMG } from "../../const/urls";
import { BuyIcon } from "../iconsComponent/BuyIcon";
import { Tooltip } from "../Tooltip/Tooltip";
import { IMovie } from "../../interfaces/movie.interface";
import CalendarIcon from "../iconsComponent/CalendarIcon";
import ModalToFavs from "../iconsComponent/ModalToFavs";
import PeopleIcon from "../iconsComponent/PeopleIcon";
import HeartIcon from "../iconsComponent/HeartIcon";
import useModal from "../../hooks/useModal";
import "./infoMovie.css";

interface IModalProps {
  onClose: Function;
  movie: IMovie;
}

export const InfoMovie = (props: IModalProps) => {
  const { modal } = useModal();

  return (
    <div className="bgModal">
      <div className="Modal">
        {modal?.map((movieItem, li) => (
          <div className="modalMovieInfo" key={li}>
            <span>
              <button type="button" className="closeButton" onClick={() => props.onClose(false)}>
                X
              </button>
            </span>
            <img src={API_IMG + movieItem.poster_path} className="modalBgMovieImg" alt={movieItem.title} />
            <div className="modalTotalInfos">
              <img src={API_IMG + movieItem.poster_path} className="modalMovieImg" alt={movieItem.title} />
              <div className="movieInfos">
                <h1 className="movieTitle">{movieItem.title}</h1>
                <span className="smallInfos">
                  <p>
                    <HeartIcon />
                    {movieItem.vote_average}
                  </p>
                  <p>
                    <PeopleIcon />
                    {movieItem.vote_count}
                  </p>
                  <p>
                    <CalendarIcon />
                    {formatDate(movieItem.release_date)}
                  </p>
                </span>
                <h2 className="movieDesc">{movieItem.overview}</h2>
                <span className="iconsSpan">
                  <Tooltip description="Adicionar ao carrinho" direction="bottom">
                    <BuyIcon movie={movieItem} />
                  </Tooltip>
                  <Tooltip description="Adicionar aos favoritos" direction="bottom">
                    <ModalToFavs movie={movieItem} />
                  </Tooltip>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
