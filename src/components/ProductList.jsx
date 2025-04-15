import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Registrar los componentes necesarios para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

import d1Logo from "../assets/logos/d1.png";
import araLogo from "../assets/logos/ara.png";
import exitoLogo from "../assets/logos/exito.png";
import interLogo from "../assets/logos/inter.png";

const storeLogos = {
  d1: d1Logo,
  ara: araLogo,
  exito: exitoLogo,
  inter: interLogo,
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

  // Agrupar por mes
  const groupedByMonth = products.reduce((acc, p) => {
    const mes = p.fecha ? new Date(p.fecha).getMonth() : "Sin fecha"; // Extraemos solo el mes
    const totalMes = (p.precio * p.cantidad).toFixed(2);
    acc[mes] = acc[mes] || [];
    acc[mes].push(totalMes);
    return acc;
  }, {});

  // Crear gráfico de torta (Pie) con los datos de los gastos por mes
  const data = {
    labels: Object.keys(groupedByMonth).map((month) => `Mes ${parseInt(month) + 1}`), // Mes 1, Mes 2...
    datasets: [
      {
        label: "Gasto Total por Mes",
        data: Object.values(groupedByMonth).map((monthData) =>
          monthData.reduce((acc, current) => acc + parseFloat(current), 0)
        ),
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 205, 86, 0.5)",
        ], // Colores para cada mes
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 205, 86, 1)",
        ], // Borde de cada sección
        borderWidth: 1,
      },
    ],
  };

  // Función de renderizado de productos
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
              <span>
                {" "} | 🏷️ {p.categoria}
              </span>
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

      {/* Gráfico de torta (Pie) de gasto mensual */}
      <h3>📊 Gasto por Mes</h3>
      <Pie data={data} options={{ responsive: true }} />

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

