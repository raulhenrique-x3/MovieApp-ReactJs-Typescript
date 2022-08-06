import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Tooltip } from "../Tooltip/Tooltip";
import { CartTrash } from "../iconsComponent/CartTrash";
import useCart from "../../hooks/useCart";
import * as yup from "yup";
import "../Form/form.css";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

type FormData = {
  fullName: string;
  cellNumber: Number;
  cpf: number;
  cep: number;
  email: string;
  adress: string;
  city: string;
  state: string;
};

// Validação do Form
const schema = yup
  .object({
    fullName: yup.string().min(2).required(),

    cpf: yup.number().positive().min(11).integer().required(),

    cellNumber: yup.number().positive().min(12).integer().required(),

    email: yup.string().email().required(),

    cep: yup.number().positive().min(8).required(),

    adress: yup.string().required(),

    city: yup.string().required(),

    state: yup.string().required(),
  })
  .required();

const Form = () => {
  // Remoção de item da seção Form
  const { cart, removeFromCart } = useCart();
  const removeItemFromCart = (id: string) => {
    removeFromCart(id);
  };

  // Validação do Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Submit das informações do Form
  const onSubmit = () => {
    setmodalCont(true);
  };

  // Cálculo dos produtos do carrinho
  const [totalSum, setTotalSum] = useState(0);
  useEffect(() => {
    const total = cart.reduce((qnt, price) => qnt + price.price, 0);
    setTotalSum(total);
  }, [cart]);

  // Mostrar modal
  const [modalCont, setmodalCont] = useState(false);

  return (
    <div className="sectionForm">
      <div className="formContent">
        <form className="finalForm" onSubmit={handleSubmit(onSubmit)}>
          <label className="inputLabel">
            <p>Finalizar Compra</p>
            <input
              className="fullInput"
              type={"text"}
              placeholder="Nome completo"
              {...register("fullName", { required: true })}
              name="fullName"
            />
            <p style={{ color: "red", fontSize: "1rem" }}>{errors.fullName && "Campo obrigatório!"}</p>
            <div className="inputHalf">
              <span>
                <input
                  className="cpfInput"
                  type={"text"}
                  placeholder="CPF"
                  {...register("cpf", { required: true })}
                  name="cpf"
                />
                <p style={{ color: "red", fontSize: "1rem" }}>{errors.cpf && "Campo obrigatório!"}</p>
              </span>

              <span>
                <input
                  className="celInput"
                  type={"tel"}
                  placeholder="Celular"
                  {...register("cellNumber", { required: true })}
                  name="cellNumber"
                />
                <p style={{ color: "red", fontSize: "1rem" }}>{errors.cellNumber && "Campo obrigatório!"}</p>
              </span>
            </div>
            <input
              className="fullInput"
              type={"email"}
              placeholder="E-mail"
              {...register("email", { required: true })}
              name="email"
            />
            <p style={{ color: "red", fontSize: "1rem" }}>{errors.email && "Campo obrigatório!"}</p>
            <div className="inputHalf">
              <span className="spanHalf">
                <input
                  className="cepInput"
                  type={"text"}
                  placeholder="CEP"
                  {...register("cep", { required: true })}
                  name="cep"
                />
                <p style={{ color: "red", fontSize: "1rem" }}>{errors.cep && "Campo obrigatório!"}</p>
              </span>
              <span className="spanHalf">
                <input
                  className="addressInput"
                  type={"text"}
                  placeholder="Endereço"
                  {...register("adress", { required: true })}
                  name="adress"
                />
                <p style={{ color: "red", fontSize: "1rem" }}>{errors.adress && "Campo obrigatório!"}</p>
              </span>
            </div>
            <div className="inputHalf">
              <span>
                <input
                  className="cityInput"
                  type={"text"}
                  placeholder="Cidade"
                  {...register("city", { required: true })}
                  name="city"
                />
                <p style={{ color: "red", fontSize: "1rem" }}>{errors.city && "Campo obrigatório!"}</p>
              </span>

              <span>
                <input
                  className="stateInput"
                  type={"text"}
                  placeholder="Estado"
                  {...register("state", { required: true })}
                  name="state"
                />
                <p style={{ color: "red", fontSize: "1rem" }}>{errors.state && "Campo obrigatório!"}</p>
              </span>
            </div>
          </label>
          <div className="buyContent">
            <div className="buyedItems">
              <div className="buyTitle">
                <div className="imgName">
                  <p>Imagem</p>
                  <p>Nome</p>
                </div>
                <div className="qtdPrice">
                  <p>Qtd</p>
                  <p className="preçoP">Preço</p>
                </div>
              </div>

              <div className="buyedMovieInfo">
                {cart?.map((item) => (
                  <div className="selectedMovie" key={item.id}>
                    <img alt={item.title} className="imgMovieBuy" src={API_IMG + item.img} />
                    <div className="testingBuy">
                      <span>
                        <p className="spanP">{item.title}</p>
                      </span>
                      <span className="spanP">
                        <p>{item.qnt}</p>
                      </span>
                      <span className="spanP">
                        <p>R${item.price}</p>
                      </span>
                      <Tooltip direction="bottom" description="Remover do carrinho">
                        <CartTrash removeitemfromcart={() => removeItemFromCart(item.id)} />{" "}
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>

              <div className="total">
                <p className="totalText">Total:</p>
                <p className="totalValue">R$ {totalSum.toFixed(2)}</p>
              </div>

              <button className="submitButton" name="submit" type="submit">
                Finalizar
              </button>
            </div>
          </div>
          <div className={modalCont ? "modalCont" : "hiddeModalCont"}>
            <div className="modal">
              <h1>Obrigado, Uzumaki Naruto!</h1>
              <h3>Sua compra foi finalizada com sucesso</h3>
              <Link to={"/"}>
                <button className="toHome">Ir para loja</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
