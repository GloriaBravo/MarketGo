import React from "react";
import { auth, googleProvider, githubProvider } from "../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import "../styles/Login.css";
import carritoLogo from "/assets/logos/logo_carrito.png"; // 👈 Importamos el logo

function Login() {
  const handleLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="login-container">
      <img
        src={carritoLogo}
        alt="Logo MarketGo"
        style={{
          width: "90px",
          marginBottom: "1rem",
          filter: "drop-shadow(0 0 5px var(--primary))",
        }}
      />
      <h1>Bienvenido a <span style={{ color: "var(--primary)" }}>MarketGo</span></h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1.5rem" }}>
        <button onClick={() => handleLogin(googleProvider)}>Iniciar sesión con Google</button>
        <button onClick={() => handleLogin(githubProvider)}>Iniciar sesión con GitHub</button>
      </div>
    </div>
  );
}

export default Login;
