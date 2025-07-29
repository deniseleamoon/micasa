import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import Cart from "./pages/Cart.jsx";
import ImageUpload from "./components/ImageUpload";
import NotFound from "./pages/not found/NotFound.jsx";
import Products from "./pages/Products.jsx";
import { ShopContextProvider } from "./context/shop-context";
import LoginSignUp from "./pages/LoginSignUp.jsx";
import {
  coffeeProducts,
  homewares,
  cookware,
  bakeware,
} from "./data/productsList";

const App = () => {
  const [filter, setFilter] = useState("");

  const allProducts = [
    ...coffeeProducts,
    ...homewares,
    ...cookware,
    ...bakeware,
  ];

  const filterProducts = (product) => {
    return product.filter(
      (product) =>
        product.title.toLowerCase().includes(filter.toLowerCase()) ||
        product.category.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <BrowserRouter>
      <ShopContextProvider>
        <div className="App">
          <NavBar filter={filter} setFilter={setFilter} />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/cart"
                element={<Cart UploadImage={ImageUpload} />}
              />
              <Route path="/login" element={<LoginSignUp />} />
              <Route
                path="/coffeetea"
                element={
                  <Products
                    products={coffeeProducts}
                    title="Coffee"
                    category="espresso"
                    categoryPicture="https://lh3.googleusercontent.com/pw/AP1GczPznOQLl45hxau96aTctwaC2Ep8H7WLir-XT1qupKuoY02PkA_nIROa_PaMxKHz7tqnZkmXeNKlAn9k_nt-OWkfzi2Y3aZHTs5hmJyelXUPNiH65kIf=w2400"
                  />
                }
              />

              <Route
                path="/cookware"
                element={
                  <Products
                    products={cookware}
                    title="Cookware"
                    category="cookware"
                    categoryPicture="https://lh3.googleusercontent.com/pw/AP1GczOmj5PpssRk4qyAKJ5n8lSlKeRQMcKQv4az6TcX56dFCSp5g4kU4Mfu4MlrQG-UygvkAClrR8MOko1ktxZSTipxlSKAEeqN-Upot6ga1bwhH7ZaTxcx=w2400"
                  />
                }
              />
              <Route
                path="/bakeware"
                element={
                  <Products
                    products={bakeware}
                    title="Bakeware"
                    category="bakeware"
                    categoryPicture="https://lh3.googleusercontent.com/pw/AP1GczPqjoNggwnbpPWXEXun_QRUQjvBZI_kiNkJ_0tFn63hkAtmb-_0A5AHrHbbfYqDD5sIXg44bP4d5ECq-W5w8z3eo4cPV4zOlVWZrMrQFgkZFBVSneZs=w2400"
                  />
                }
              />
              <Route
                path="/homeessentials"
                element={
                  <Products
                    products={homewares}
                    title="Home Essentials"
                    category="homewares"
                    categoryPicture="https://lh3.googleusercontent.com/pw/AP1GczNsJhZVMSdYvX6ttOUusaxxSZ2_c-Wv8V7PswQhSBuwhCeH5IQ_8qNRriBreD_2S6kDbq_-T7Vp2jojWeIiYcVawNrPFofoaqVsbhWY903UU53lt_eo=w2400"
                  />
                }
              />
              <Route path="*" element={NotFound} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ShopContextProvider>
    </BrowserRouter>
  );
};

export default App;
