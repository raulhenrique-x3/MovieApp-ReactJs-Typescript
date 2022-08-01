import { useContext } from "react";
import { FavContext } from "../context/favoritesContext";
export default () => {
    const context = useContext(FavContext)
    return context;
}