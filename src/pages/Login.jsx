import React from "react";
import { auth, googleProvider, githubProvider } from "../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import "../styles/Login.css";
import carritoLogo from "/assets/logos/logo_carrito.png";  // Logo para usar en la página de login

function Login() {
  const handleLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/dashboard";  // Redirige al dashboard después de iniciar sesión
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="login-container">
      <img
        src={carritoLogo}
        alt="Logo MarketGo"
        className="logo"
      />
      <h1>Bienvenido a <span className="highlight">MarketGo</span></h1>
      <div className="login-buttons">
        <button className="google-btn" onClick={() => handleLogin(googleProvider)}>
          Iniciar sesión con Google
        </button>
        <button className="github-btn" onClick={() => handleLogin(githubProvider)}>
          Iniciar sesión con GitHub
        </button>
      </div>
    </div>
  );
}

export default Login;
