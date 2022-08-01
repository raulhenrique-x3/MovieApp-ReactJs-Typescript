import React, { Reducer, useReducer } from "react";

export interface ICartContext {
  cart: TCart;
  updateCart: (type: string, payload: IItem) => void;
  clearCart: () => void;
  removeFromCart: (id: string) => void;
}

export interface IItem {
  id: string;
  qnt: number;
  price: number;
  title: string;
  img: string;
}

export type TCart = IItem[];

export const CartContext = React.createContext<ICartContext>({
  cart: [],
  updateCart: () => {},
  clearCart: () => {},
  removeFromCart: () => {},
});

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  reducer: Reducer<TCart, any>;
  initialState: TCart;
}

export default function CartProvider({ children, reducer, initialState }: IProps) {
  const [cartState, cartDispatch] = useReducer<Reducer<TCart, any>>(reducer, initialState);

  const updateCart = (type: string, payload: IItem) => {
    cartDispatch({ type, payload });
  };

  const clearCart = () => {
    cartDispatch({ type: "clear" });
  };

  const removeFromCart = (id: string) => {
    cartDispatch({ type: "remove", payload: { id } });
  };

  return (
    <CartContext.Provider value={{ cart: cartState, updateCart, clearCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const CartConsumer = CartContext.Consumer;
