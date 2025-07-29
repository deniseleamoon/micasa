import PropTypes from "prop-types";
import React, { useContext } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { Bag, Heart, User, Package } from "phosphor-react";
import { ShopContext } from "../context/shop-context";

const NavBar = ({ filter, setFilter }) => {
  const { getTotalCartCount } = useContext(ShopContext);
  const cartCount = getTotalCartCount();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <header>
        <div className="color">
          <ul className="headerIcons">
            <li>
              <Link to="/login">
                <p className="userLogin">
                  <User size={25} />
                </p>
              </Link>
            </li>
            <li>
              <p className="trackOrders">
                <Package size={25} />
              </p>
            </li>
            <li>
              <p>
                <Heart size={25} />
              </p>
            </li>
            <li>
              <Link className="cartStylingLink" to="/cart">
                <div className="cartAndCartCount">
                  <p className="cartStyle">
                    <Bag size={25} />
                  </p>
                  <div className="cartCounter">{cartCount}</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="logoHeaderContainer">
          <div className="inputNavWrapper">
            <input
              className="searchBox"
              type="text"
              placeholder="What are you looking for?"
              value={filter}
              onChange={handleFilterChange}
            />
          </div>
          <div className="logorapper">
            <Link to="/">
              <h1 className="logo" alt="logo" aria-label="Homepage">
                Mi Casa
              </h1>
            </Link>
          </div>
        </div>
      </header>
      <nav className="nav">
        <ul className="navContainer">
          <li>
            <Link to="/coffeetea">Coffee & Espresso</Link>
          </li>
          <li>
            <Link to="/cookware">Cookware</Link>
          </li>
          <li>
            <Link to="/homeessentials">Home Essentials</Link>
          </li>
          <li>
            <Link to="/bakeware">Bakeware</Link>
          </li>
        </ul>
      </nav>

      <section>
        <hr />
        <ul className="dealsBar">
          <li className="deals">
            Great Deals on Cookware Free Two Day Shipping
            <br />
            <h5 className="shopNow">shop now</h5>
          </li>
          <li className="deals">
            Great Deals on top brands Free Two Day Shipping
            <br />
            <h5 className="shopNow">shop now</h5>
          </li>
          <li className="deals">
            Free Two Day Shipping
            <br />
            <h5 className="shopNow">shop now</h5>
          </li>
        </ul>
        <hr />
      </section>
    </>
  );
};

NavBar.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default NavBar;
