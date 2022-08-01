import React, { Reducer, useReducer } from "react";
import { IItem } from "./cartContext";

export interface IFavContext {
  favorites: TFavorites;
  updateFavorites: (type: string, payload: IItem) => void;
  clearFavorites: () => void;
  removeFavorites: (id: string) => void;
}

export type TFavorites = IItem[];

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  reducer: Reducer<TFavorites, any>;
  initialState: TFavorites;
}

export const FavContext = React.createContext<IFavContext>({
  favorites: [],
  updateFavorites: () => {},
  clearFavorites: () => {},
  removeFavorites: () => {},
});

export default function FavoritesProvider({ children, reducer, initialState }: IProps) {
  const [favoritesState, favoritesDispatch] = useReducer<Reducer<TFavorites, any>>(reducer, initialState);

  const updateFavorites = (type: any, payload: any) => {
    favoritesDispatch({ type, payload });
  };

  const clearFavorites = () => {
    favoritesDispatch({ type: "clear" });
  };

  const removeFavorites = (id: string) => {
    favoritesDispatch({ type: "remove", payload: { id } });
  };

  return (
    <FavContext.Provider value={{ favorites: favoritesState, updateFavorites, clearFavorites, removeFavorites }}>
      {children}
    </FavContext.Provider>
  );
}

export const FavoriteConsumer = FavContext.Consumer;
