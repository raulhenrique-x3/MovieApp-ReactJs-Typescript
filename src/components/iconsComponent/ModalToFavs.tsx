import { IMovie } from "../../interfaces/movie.interface";
import useFavorites from "../../hooks/useFavorites";

interface IProps {
  movie: IMovie;
}

export default function ModalToFavs(props: IProps) {
  const { updateFavorites } = useFavorites();
  const handleAddFav = () => {
    updateFavorites("add", {
      id: props?.movie?.id,
      qnt: 1,
      price: 79.99,
      title: props?.movie?.title,
      img: props?.movie?.poster_path,
    });
  };
  return (
    <svg
      onClick={() => handleAddFav()}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      className="heartFill"
      viewBox="0 0 16 16"
    >
      <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
    </svg>
  );
}
