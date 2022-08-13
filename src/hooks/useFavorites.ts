import { useContext } from "react";
import { FavContext } from "../context/favoritesContext";

//eslint-disable-next-line
export default () => {
  const context = useContext(FavContext);
  return context;
};
