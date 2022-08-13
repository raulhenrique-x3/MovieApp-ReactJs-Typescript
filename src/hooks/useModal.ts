import { useContext } from "react";
import { ModalContext } from "../context/modalContext";

//eslint-disable-next-line
export default () => {
  const context = useContext(ModalContext);
  return context;
};
