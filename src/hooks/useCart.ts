import { useContext } from "react";
import { CartContext } from '../context/cartContext'

export default () => {
    const context = useContext(CartContext)
    return context;
}