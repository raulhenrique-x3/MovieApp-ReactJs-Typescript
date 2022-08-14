import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartTrash } from "../iconsComponent/CartTrash";
import { Tooltip } from "../Tooltip/Tooltip";
import useCart from "../../hooks/useCart";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

export const Cart = () => {
  // Gerenciamento de estado do carrinho
  const { cart, clearCart, removeFromCart } = useCart();

  const handleClearCart = () => {
    clearCart();
  };

  const removeItemFromCart = (id: string) => {
    removeFromCart(id);
  };

  // Navegação condicional - ReactRouterDom
  const navigate = useNavigate();
  async function conditionalRoute() {
    if (cart.length < 1) {
      navigate("/");
    } else {
      navigate("/Form");
    }
  }

  // Cálculo dos produtos do carrinho
  const [totalSum, setTotalSum] = useState(0);
  useEffect(() => {
    let initialValue = 0;
    cart.map((movie) => (initialValue += movie.qnt * movie.price));
    setTotalSum(initialValue);
  }, [cart]);

  return (
    <>
      <div className="carInfo">
        <div className="firstCarCont">
          <h2 className="myCart">Meu carrinho</h2>
          <p onClick={handleClearCart} className="empty">
            Esvaziar
          </p>
        </div>
        <div className="cartProducts">
          {cart?.map((item) => (
            <div className="cartItem" key={item.id}>
              <img alt={item.title} className="imgCart" src={API_IMG + item.img} />
              <p className="titleP">{item.title}</p>
              <p className="itemQnt">{item.qnt}</p>
              <p className="itemValue">R${item.price}</p>
              <Tooltip direction="bottom" description="Remover do carrinho">
                <CartTrash removeitemfromcart={() => removeItemFromCart(item.id)} />
              </Tooltip>
            </div>
          ))}
        </div>
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
    </>
  );
};
