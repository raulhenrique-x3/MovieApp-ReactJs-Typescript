import Header from "./components/Header/Header";
import Section01 from "./components/Section01/Section01";
import Form from "./components/Form/Form";
import Search from "./components/Search/Search";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { cartReducer, initialCart } from "./context/cartReducer";
import { favoritesReducer, initialFavorites } from "./context/favoritesReducer";
import CartProvider from "./context/cartContext";
import FavoritesProvider from "./context/favoritesContext";
import routes from "./const/routes";
import ModalProvider from "./context/modalContext";
import { initialModal, modalReducer } from "./context/modalReducer";

export default function App() {
  return (
    <ModalProvider reducer={modalReducer} initialState={initialModal}>
      <FavoritesProvider reducer={favoritesReducer} initialState={initialFavorites}>
        <CartProvider reducer={cartReducer} initialState={initialCart}>
          <div className="App">
            <div className="content">
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route path="/" element={<Section01 />} />
                  <Route path={routes.Form} element={<Form />} />
                  <Route path={routes.Search} element={<Search />} />
                  {/* <Route path='*' element={<NotFound />} /> */}
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        </CartProvider>
      </FavoritesProvider>
    </ModalProvider>
  );
}
