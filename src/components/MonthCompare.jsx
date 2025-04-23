import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const MonthCompare = () => {
  const { products } = useContext(ProductContext);

  const groupedByMonth = products.reduce((acc, p) => {
    const mes = p.fecha?.slice(0, 7) || "Sin fecha";
    acc[mes] = acc[mes] || [];
    acc[mes].push(p);
    return acc;
  }, {});

  return (
    <div>
      <h3>Comparación por Mes</h3>
      {Object.entries(groupedByMonth).map(([mes, list]) => {
        const totalMes = list.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
        return (
          <div key={mes}>
            <strong>{mes}</strong>: {list.length} productos - Total: ${totalMes.toFixed(2)}
          </div>
        );
      })}
    </div>
  );
};

export default MonthCompare;
