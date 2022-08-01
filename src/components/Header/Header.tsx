import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useFavorites from "../../hooks/useFavorites";
import "../Header/header.css";
import { Tooltip } from "../Tooltip/Tooltip";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const Header = () => {
  // Gerenciamento de estado do carrinho
  const { cart, clearCart, removeFromCart, updateCart } = useCart();
  const { favorites, clearFavorites, removeFavorites } = useFavorites();

  const handleClearCart = () => {
    clearCart();
  };
  const handleClearFavorites = () => {
    clearFavorites();
  };

  const removeFav = (id: string) => {
    removeFavorites(id);
  };

  const removeCart = (id: string) => {
    removeFromCart(id);
  };

  // Adicionar ao carrinho a partir dos favoritos

  const handleAddFromFavs = (item: any) => {
    updateCart("add", { id: item?.id, qnt: 1, price: 79.99, title: item?.title, img: item?.poster_path });
  };

  // Navegação condicional - ReactRouterDom
  const navigate = useNavigate();
  async function conditionalRoute() {
    setShowBuyMenu(!setShowBuyMenu);

    if (cart.length < 1) {
      navigate("/");
    } else {
      navigate("/Form");
    }
  }

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

  // Cálculo dos produtos do carrinho
  const [totalSum, setTotalSum] = useState(0);
  useEffect(() => {
    let initialValue = 0;
    cart.map((movie) => (initialValue += movie.qnt * movie.price));
    setTotalSum(initialValue);
  }, [cart]);

  // Filtro de pesquisa
  const [searchItem, setSearchItem] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!searchItem) return;

    navigate(`/Search?q=${searchItem}`);
    setSearchItem("");
  };

  return (
    <>
      <nav className="navHeader">
        <Link to={"/"}>
          <h1>LOGO</h1>
        </Link>
        <form className="searchForm" onSubmit={handleSubmit}>
          <div className="inputSearch">
            <input
              onChange={(e) => setSearchItem(e.target.value)}
              value={searchItem}
              type={"text"}
              placeholder="Pesquisa"
            ></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
        </form>

        <div className="headerIcons">
          <p className="qntItem">{favorites?.length || 0}</p>
          <svg
            onClick={showFavs}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          </svg>
          <div className="carMenu">
            <p className="qntItem">{cart?.length || 0}</p>
            <svg
              onClick={showCartMenu}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi-cart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </div>
        </div>
      </nav>

      <div className={showBuyMenu ? "showBuyMenu" : "hiddeBuyMenu"}>
        <div className="carInfo">
          <div className="firstCarCont">
            <h2>Meu carrinho</h2>
            <p onClick={handleClearCart} className="empty">
              Esvaziar
            </p>
          </div>
          <div className="cartProducts">
            {cart?.map((item) => (
              <div className="cartItem" key={item.id}>
                <img alt={item.title} className="imgCart" src={API_IMG + item.img} />
                <p className="titleP">{item.title}</p>
                <p>{item.qnt}</p>
                <p>R${item.price}</p>
                <Tooltip direction="bottom" description="Remover do carrinho">
                  <svg
                    onClick={() => removeCart(item.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                  </svg>
                </Tooltip>
              </div>
            ))}
          </div>
          <div className="finish">
            <div className="totalSum">
              <p className="totalP">Total: </p>
              <p className="totalSumItem"> R$ {totalSum.toFixed(2)}</p>
            </div>
            <button onClick={() => conditionalRoute()} className="formButton">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>

      <div className={showFavorites ? "showFavorites" : "hiddeFavorites"}>
        <div className="carInfo">
          <div className="firstCarCont">
            <h2>Meus favoritos</h2>
            <p onClick={handleClearFavorites}>Esvaziar</p>
          </div>
          <div className="cartProducts">
            {favorites?.map((item) => (
              <div className="cartItem" key={item.id}>
                <img alt={item.title} className="imgCart" src={API_IMG + item.img} />
                <p className="titleP">{item.title}</p>
                <p>R${item.price}</p>
                <Tooltip direction="bottom" description="Adicionar ao carrinho">
                  <svg
                    onClick={() => handleAddFromFavs(item)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi-cart-fill-fav"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </Tooltip>
                <Tooltip direction="bottom" description="Remover dos favoritos">
                  <svg
                    onClick={() => removeFav(item.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                  </svg>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
