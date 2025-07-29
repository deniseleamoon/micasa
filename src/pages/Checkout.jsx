import { ShopContext } from "../context/shop-context";
import "./Checkout.css";

export const Checkout = () => {
  const { getTotalCartAmount, cartItems } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  return (
    <div className="checkoutContainer">
      <div className="cartItemsTotal">
        <h1>Checkout</h1>
        <div>
          <div className="cartItemsTotalSummary"></div>
          <p>Subtotal</p>
          <p>${0}</p>

          <hr />
          <p>Shipping Fee:</p>
          <p>Free</p>
          <hr />
          <h3>Total</h3>
          <h3>${0}</h3>
          <button className="paymentButton">Proceed To Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
