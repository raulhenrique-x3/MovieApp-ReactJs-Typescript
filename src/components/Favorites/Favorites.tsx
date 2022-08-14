import { FavoritesTrash } from "../iconsComponent/FavoritesTrash";
import { BuyFromFavs } from "../iconsComponent/BuyFromFavs";
import { Tooltip } from "../Tooltip/Tooltip";
import useFavorites from "../../hooks/useFavorites";
import "../Header/header.css";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

export const Favorites = () => {
  // Gerenciamento de estado do carrinho
  const { favorites, clearFavorites, removeFavorites } = useFavorites();

  const handleClearFavorites = () => {
    clearFavorites();
  };

  const removeItemFromFav = (id: string) => {
    removeFavorites(id);
  };

  return (
    <div className="carInfo">
      <div className="firstCarCont">
        <h2 className="myCart">Meus favoritos</h2>
        <p onClick={handleClearFavorites} className="empty">
          Esvaziar
        </p>
      </div>
      <div className="cartProducts">
        {favorites?.map((item) => (
          <div className="cartItem" key={item.id}>
            <img alt={item.title} className="imgCart" src={API_IMG + item.img} />
            <p className="titleP">{item.title}</p>
            <p className="itemValue">R${item.price}</p>
            <Tooltip direction="bottom" description="Adicionar ao carrinho">
              <BuyFromFavs movie={item} />
            </Tooltip>
            <Tooltip direction="bottom" description="Remover dos favoritos">
              <FavoritesTrash removeitemfromfav={() => removeItemFromFav(item.id)} />
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};
