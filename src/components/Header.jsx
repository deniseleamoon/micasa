import { Link } from "react-router-dom";
import { ShoppingCart, Heart, User, Package } from "phosphor-react";

import "./Header.css";

function Header() {
  return (
    <header>
      <ul className="headerIcons">
        <li>
          <p className="account">Account</p>
        </li>
        <li>
          <p className="trackOrders">
            <Package size={25} />
          </p>
        </li>
        <li>
          {/* <p className="heartEmoji">&hearts;</p> */}
          <Heart size={25} />
        </li>
        <li>
          <Link to="cart">
            <ShoppingCart size={25} />
          </Link>
          {/* <Link to="ShoppingCart">
            <img
              className="shoppingBag"
              src="https://lh3.googleusercontent.com/pw/AP1GczPosPG2gw6nm62bkZVz9CHxJ_8eIWqmwzsH03w3s1ZVV6inMLN4LfEMXyJ2rn3tVYjzfl-5Aem3wddGaYGc3z_ouIvxidR8psB_9sCdLTPKimYNf55z=w2400"
            />
          </Link> */}
        </li>
      </ul>
      <div className="logoHeaderContainer">
        <div>
          <input
            className="searchBox"
            type="text"
            name="text"
            id="text"
            placeholder="What are you looking for?"
          />
          <button className="sortProduct">&#x1F50D; </button>
        </div>
        <div>
          <Link to="/">
            <h1 className="logo" alt="logo">
              Logo
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
