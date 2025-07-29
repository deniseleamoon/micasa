import PropTypes from "prop-types";
import { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router-dom";
import {
  coffeeProducts,
  homewares,
  cookware,
  bakeware,
} from "../data/productsList";
import "./Cart.css";

export const Cart = ({ UploadImage }) => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const allProducts = [
    ...coffeeProducts,
    ...homewares,
    ...cookware,
    ...bakeware,
  ];

  const navigate = useNavigate();

  const cartIsEmpty =
    !cartItems || Object.keys(cartItems).length === 0 || totalAmount === 0;

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
  };

  return (
    <>
      <section className="shoppingBag">
        <div className="mainTitle">
          <h1>Your Cart Items</h1>
        </div>
        <div className="cartItemsContainer">
          {cartIsEmpty ? (
            <div className="emptyCartMessage">
              <span>Your cart is empty.</span>
              <button
                className="emptyCartButton"
                onClick={() => navigate("/")}
                aria-label="Return to homepage"
              >
                Take a look around.
              </button>
            </div>
          ) : (
            <>
              <div className="cartItems">
                {allProducts
                  .filter((product) => cartItems[product.id] > 0)
                  .map((product) => (
                    <CartItem key={product.id} product={product} />
                  ))}
              </div>
              <div className="checkoutContainer">
                <p className="subtotal">Subtotal: ${totalAmount.toFixed(2)}</p>
                <div className="buttonContainer">
                  <button
                    className="continueShoppingButton"
                    onClick={() => navigate("/")}
                    aria-label="Continue shopping"
                  >
                    Continue Shopping
                  </button>
                  <button
                    className="checkoutButton"
                    aria-label="Proceed to checkout"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <section className="userImages">
        <UploadImage />
      </section>
    </>
  );
};

Cart.protoTypes = {
  UploadImage: PropTypes.func.isRequired,
};

export default Cart;
