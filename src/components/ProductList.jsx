import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

// Rutas correctas para las imágenes de las tiendas
const storeLogos = {
  d1: "/assets/logos/D1.png",  // Usar ruta absoluta desde la raíz
  ara: "/assets/logos/Ara.png",
  exito: "/assets/logos/Exito.png",
  inter: "/assets/logos/Inter.png",
};

const categoriaIconos = {
  alimentos: "🥦",
  lácteos: "🥛",
  cárnicos: "🥩",
  aseo: "🧼",
  bebidas: "🧃",
  otros: "🛒",
};

const ProductList = () => {
  const { products, total, removeProduct } = useContext(ProductContext);

  // Función para renderizar productos
  const renderProduct = (p) => {
    const logo = storeLogos[p.tienda?.toLowerCase()];
    const fechaFormateada = p.fecha ? new Date(p.fecha).toLocaleDateString() : "Sin fecha";

    return (
      <li key={p.id}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {logo && (
            <img
              src={logo}
              alt={p.tienda}
              style={{ width: "30px", height: "30px", objectFit: "contain" }}
            />
          )}
          <div style={{ flex: "1 1 200px" }}>
            <strong>{p.nombre}</strong>
            <br />
            <small style={{ color: "gray" }}>📅 {fechaFormateada}</small>
            <br />
            <span>
              💲 {p.precio.toFixed(2)} x {p.cantidad} = ${(p.precio * p.cantidad).toFixed(2)}
            </span>
            <br />
            {p.peso && p.unidad && <span>⚖️ {p.peso} {p.unidad}</span>}
            <br />
            {p.tienda && <span>🏬 {p.tienda}</span>}
            {p.categoria && (
              <span> | 🏷️ {p.categoria}</span>
            )}
          </div>
          <button onClick={() => removeProduct(p.id)}>🗑️</button>
        </div>
      </li>
    );
  };

  return (
    <div>
      <h3>Productos Agregados</h3>
      <h4>Total: ${total.toFixed(2)}</h4>

      {/* Lista de productos */}
      {products.length === 0 ? (
        <p>No hay productos agregados aún.</p>
      ) : (
        <ul>{products.map(renderProduct)}</ul>
      )}
    </div>
  );
};

export default ProductList;

