import "./checkout-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { deleteItemFromCart, removeItemFromCart, addItemToCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  const onIncrement = () => {
    addItemToCart(cartItem);
  };

  const onDecrement = () => {
    removeItemFromCart(cartItem);
  };

  const onRemove = () => {
    deleteItemFromCart(cartItem);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <button className="arrow" onClick={onDecrement}>
          &#10094;
        </button>
        <span className="value">{quantity}</span>
        <button className="arrow" onClick={onIncrement}>
          &#10095;
        </button>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={onRemove}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
