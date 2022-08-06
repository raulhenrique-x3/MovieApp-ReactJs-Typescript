import { useState } from "react";
import { Link } from "react-router-dom";
import { ShowFavs } from "../iconsComponent/ShowFavs";
import { ShowCart } from "../iconsComponent/ShowCart";
import useCart from "../../hooks/useCart";
import useFavorites from "../../hooks/useFavorites";
import "../Header/header.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { Cart } from "../Cart/Cart";
import { Favorites } from "../Favorites/Favorites";

const Header = () => {
  // Gerenciamento de estado do carrinho
  const { cart } = useCart();
  const { favorites } = useFavorites();

  // useState para manipular os menus do Header
  const [showBuyMenu, setShowBuyMenu] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const showCartMenu = () => {
    setShowBuyMenu(!showBuyMenu);
    setShowFavorites(false);
  };

  const showFavs = () => {
    setShowFavorites(!showFavorites);
    setShowBuyMenu(false);
  };

  return (
    <>
      <nav className="navHeader">
        <Link to={"/"}>
          <h1>LOGO</h1>
        </Link>
        <SearchBar />
        <div className="headerIcons">
          <p className="qntItem">{favorites?.length || 0}</p>
          <ShowFavs showfavs={showFavs} />
          <div className="carMenu">
            <p className="qntItem">{cart?.length || 0}</p>
            <ShowCart showcartmenu={showCartMenu} />
          </div>
        </div>
      </nav>
      <div className={showBuyMenu ? "showBuyMenu" : "hiddeBuyMenu"}>
        <Cart />
      </div>
      <div className={showFavorites ? "showFavorites" : "hiddeFavorites"}>
        <Favorites />
      </div>
    </>
  );
};

export default Header;
