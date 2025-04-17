import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

// Importar logos de tiendas
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

  // Agrupar por mes y categoría
  const groupedByMonthCategory = products.reduce((acc, p) => {
    const mes = p.fecha ? new Date(p.fecha).getMonth() : "Sin fecha"; // Extraemos solo el mes
    const totalMes = (p.precio * p.cantidad).toFixed(2);
    const categoria = p.categoria || "Otros";

    if (!acc[mes]) {
      acc[mes] = {};
    }

    acc[mes][categoria] = acc[mes][categoria] || 0;
    acc[mes][categoria] += parseFloat(totalMes);

    return acc;
  }, {});

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

      {/* Cuadro de comparación por mes y categoría */}
      <h3>📊 Comparación por Mes y Categoría</h3>
      <div>
        {Object.entries(groupedByMonthCategory).map(([mes, categories]) => {
          return (
            <div key={mes}>
              <h4>{`Mes ${parseInt(mes) + 1}`}</h4>
              <table>
                <thead>
                  <tr>
                    <th>Categoría</th>
                    <th>Total Gasto</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(categories).map(([categoria, total]) => (
                    <tr key={categoria}>
                      <td>{categoriaIconos[categoria] || "🏷️"} {categoria}</td>
                      <td>${total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

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
