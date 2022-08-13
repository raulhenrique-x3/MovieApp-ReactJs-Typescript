import { IModal, TModal } from "./modalContext";

export const initialModal: TModal = localStorage.modal ? JSON.parse(localStorage.modal) : [];

interface IModalAction {
  type: string;
  payload: IModal;
}

export const modalReducer = (state: TModal, action: IModalAction) => {
  switch (action.type) {
    case "view":
      const movie = state.find((i) => i.id === action.payload.id);
      if (movie !== undefined) {
        return state.map((i) => {
          if (i.id === movie.id) return movie;
          return i;
        });
      }
      return [...state, action.payload];

    case "exit":
      return state.filter((i) => i.id !== action.payload.id);

    default:
      return state;
  }
};
