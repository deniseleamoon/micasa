import PropTypes from "prop-types";
import { useContext } from "react";
import "./Styles.css";
import { ShopContext } from "../context/shop-context";

const Products = ({ id, products, title, categoryPicture }) => {
  const { addToCart, cartItems } = useContext(ShopContext);

  const handleClick = (e, productId) => {
    e.stopPropagation();
    console.log("🛒 Product ID when clicking add to cart:", productId);
    addToCart(productId);
  };

  if (!products.length) {
    return <h2>No products available in this category.</h2>;
  }

  return (
    <>
      <h1 className="mainTitle">{title}</h1>
      <div className="mainImageContainer">
        <img
          className="mainImage"
          src={categoryPicture}
          alt={`${title} image`}
        />
      </div>
      <ul className="main_product_Container">
        {products.map((product) => {
          const productCartItemAmount = cartItems[product.id] || 0;
          return (
            <li className="product_item" key={product.id}>
              <div className="product">
                <img
                  className="product_image"
                  src={product.image}
                  alt={product.title}
                ></img>
                <h3 className="product_title">{product.title}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <button
                  className="addToCartBtn"
                  onClick={(e) => handleClick(e, product.id)}
                  aria-label={`Add ${product.title} to cart`}
                >
                  Add to Cart
                  {productCartItemAmount > 0 && <>({productCartItemAmount})</>}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

Products.propTypes = {
  id: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  categoryPicture: PropTypes.string.isRequired,
};
export default Products;
