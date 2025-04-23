import React from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import MonthCompare from "../components/MonthCompare";
import ThemeToggle from "../components/ThemeToggle";
import { ProductProvider } from "../context/ProductContext";
import { auth } from "../firebase/firebaseConfig";

const Dashboard = () => {
  const logout = () => {
    auth.signOut();
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <ProductProvider>
      <div style={{ padding: "1rem", position: "relative" }}>
        <ThemeToggle />
        <h2>Lista de Mercado</h2>
        <button onClick={logout}>Cerrar sesión</button>

        <ProductForm />
        <ProductList />
        <MonthCompare />

        {/* Botón de WhatsApp */}
        <a
          href="https://wa.me/573001112233" // ✅ Reemplaza con tu número real
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#25D366",
            color: "white",
            padding: "0.75rem 1rem",
            borderRadius: "50px",
            fontWeight: "bold",
            textDecoration: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            zIndex: 1000
          }}
        >
          💬 WhatsApp
        </a>
      </div>
    </ProductProvider>
  );
};

export default Dashboard;

