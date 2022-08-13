import { useContext } from "react";
import { CartContext } from "../context/cartContext";

//eslint-disable-next-line
export default () => {
  const context = useContext(CartContext);
  return context;
};
