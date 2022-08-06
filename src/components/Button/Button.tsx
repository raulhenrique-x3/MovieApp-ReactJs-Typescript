import useCart from "../../hooks/useCart";
import "../Button/button.css";

export const Button = (props: any) => {
  const { updateCart } = useCart();

  const handleAdd = () => {
    updateCart("add", {
      id: props?.movie?.id,
      qnt: 1,
      price: 79.99,
      title: props?.movie?.title,
      img: props?.movie?.poster_path,
    });
    console.log(props.movie);
  };

  return (
    <button className="addButton" onClick={() => handleAdd()}>
      {props.txt}
    </button>
  );
};
