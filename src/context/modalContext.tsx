import React, { Reducer, useReducer } from "react";

export interface IModalContext {
  modal: TModal;
  updateModal: (type: string, payload: IModal) => void;
  removeFromModal: (id: string) => void;
}

export interface IModal {
  vote_count: number;
  id: string;
  price: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: string;
}

export type TModal = IModal[];

export const ModalContext = React.createContext<IModalContext>({
  modal: [],
  updateModal: () => {},
  removeFromModal: () => {},
});

interface IModalProps {
  children: React.ReactNode | React.ReactNode[];
  reducer: Reducer<TModal, any>;
  initialState: TModal;
}

export default function ModalProvider({ children, reducer, initialState }: IModalProps) {
  const [modalState, modalDispatch] = useReducer<Reducer<TModal, any>>(reducer, initialState);

  const updateModal = (type: string, payload: IModal) => {
    modalDispatch({ type, payload });
  };

  const removeFromModal = (id: string) => {
    modalDispatch({ type: "exit", payload: { id } });
  };

  return (
    <ModalContext.Provider value={{ modal: modalState, updateModal, removeFromModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const ModalConsumer = ModalContext.Consumer;
