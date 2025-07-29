import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="heroRight">
        <div className="heroImage">
          <h2 className="heroText">New Arrivals</h2>
          <p className="heroTextCollections">
            <br />&<br />
            New Collections
          </p>
        </div>
        <hr />
        <div className="heroCenter">
          <div className="productsHero">
            <div className="productImage1">
              <Link to="/coffeetea">
                <h3 className="productText">Coffee & Tea</h3>
              </Link>
            </div>
            <div className="productImage2">
              <Link to="/cookware">
                <h3 className="productText">Cookware</h3>
              </Link>
            </div>
            <div className="productImage3">
              <Link to="/homeessentials">
                <h3 className="productText">Home Essentials</h3>
              </Link>
            </div>
            <div className="productImage4">
              <Link to="/bakeware">
                <h3 className="productText">Bakeware</h3>
              </Link>
            </div>
          </div>
        </div>
        <hr />

        <div className="her-latest-btn">
          <img
            className="heroBottom"
            src="https://lh3.googleusercontent.com/pw/AP1GczN9jUejEc1uFzX-Rabq7SzQupqcSRd_XYa3OYdyu1wiQu3hQo08tVCLprTHCxjEF77pWOkkCVcFR25lXDmFPKI9wGoZy2Z7drmj4MXH5PCbkUTg9uUf=w2400"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
