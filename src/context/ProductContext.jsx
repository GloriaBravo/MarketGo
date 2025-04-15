import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
    calculateTotal(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    calculateTotal(products);
  }, [products]);

  const calculateTotal = (list) => {
    const sum = list.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    setTotal(sum);
  };

  const addProduct = (newProduct) => {
    const exists = products.some(
      (p) => p.nombre.toLowerCase() === newProduct.nombre.toLowerCase()
    );
    if (exists) return false;

    const productWithId = {
      ...newProduct,
      id: generateId(),
      fecha: new Date().toISOString().split("T")[0],
    };
    setProducts([...products, productWithId]);
    return true;
  };

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{ products, total, addProduct, removeProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
