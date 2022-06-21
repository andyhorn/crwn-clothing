import "./product-card.styles.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
  const { price, name, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const onClick = () => {
    addItemToCart(product);
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={onClick}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
