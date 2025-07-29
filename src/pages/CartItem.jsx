import PropTypes from "prop-types";
import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import "./CartItem.css";

export const CartItem = ({ product }) => {
  const { id, title, price, image } = product;
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    removeEntireItemFromCart,
  } = useContext(ShopContext);

  const handleInputChange = (e) => {
    const newCount = e.target.value === "" ? 0 : Number(e.target.value);
    if (!Number.isNaN(newCount)) {
      updateCartItemCount(newCount, id);
    }
  };
  const itemCount = cartItems[id] || 0;
  const totalPrice = (price * itemCount).toFixed(2);

  return (
    <div className="cartItemContainer">
      <div>
        <img className="cartImage" src={image} alt={title} />
      </div>
      <div className="cartItemDetails">
        <p className="cartTitle">
          <b>{title}</b>
        </p>
        <p className="cartPrice">
          <b>Price:</b> ${price.toFixed(2)}
        </p>
        <div className="countHandler">
          <button
            className="countButton"
            onClick={() => removeFromCart(id)}
            aria-label={`Decrease count of ${title}`}
          >
            -
          </button>
          <input
            type="number"
            className="countInputDisplay"
            value={itemCount}
            onChange={handleInputChange}
            min="0"
          />
          <button
            className="countButton"
            onClick={() => addToCart(id)}
            aria-label={`Increase count of ${title}`}
          >
            +
          </button>
        </div>
        <p className="totalPrice">
          <b>Total:</b> ${totalPrice}
        </p>
        <div className="addDeleteItemButtonContainer">
          <button className="addToFavoritesButton">Add to Favorites</button>
          <button
            className="deleteItemButton"
            onClick={() => removeEntireItemFromCart(id)}
            aria-label={`Remove ${title} from cart`}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
