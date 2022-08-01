import { IItem } from "./cartContext";
import { TFavorites } from "./favoritesContext";

export const initialFavorites = localStorage.favorites ? JSON.parse(localStorage.favorites) : [];

interface IAction{
    type: string;
    payload: IItem;
}

export const favoritesReducer = (state: TFavorites, action: IAction) => {
    switch (action.type) {
        case 'add':
            const item = state.find((i) => i.id === action.payload.id)
            if (item !== undefined) {
                item.qnt = 1;
                return state.map((i) => {
                    if (i.id === item.id) return item
                    return i
                })

            }
            return [
                ...state,
                action.payload
            ];

        case 'remove':
            return state.filter((i) =>
                i.id !== action.payload.id
            );

        case 'clear':
            return [];

        default:
            return state;

    }
}