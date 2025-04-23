import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import carritoLogo from "/assets/logos/logo_carrito.png";

const CATEGORIAS = [
  "Alimentos",
  "Lácteos",
  "Cárnicos",
  "Aseo",
  "Bebidas",
  "Otros",
];

const UNIDADES = [
  { label: "Kilo (kg)", value: "kg" },
  { label: "Libra (lb)", value: "lb" },
  { label: "Gramo (g)", value: "g" },
  { label: "Litro (l)", value: "l" },
  { label: "Mililitro (ml)", value: "ml" },
  { label: "Unidad (und)", value: "unidad" },
];

const ProductForm = () => {
  const { addProduct } = useContext(ProductContext);
  const [form, setForm] = useState({
    nombre: "",
    precio: 0,
    cantidad: 1,
    tienda: "",
    categoria: "",
    granel: false,
    peso: "",
    unidad: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || form.precio <= 0 || !form.tienda || !form.categoria) {
      return alert("Por favor completa todos los campos obligatorios");
    }

    if (form.granel && (!form.peso || !form.unidad)) {
      return alert("Por favor ingresa el peso y selecciona la unidad.");
    }

    const precioFinal =
      form.granel && form.peso
        ? form.precio * parseFloat(form.peso)
        : parseFloat(form.precio);

    const success = addProduct({
      nombre: form.nombre,
      precio: precioFinal,
      cantidad: parseFloat(form.cantidad),
      tienda: form.tienda,
      categoria: form.categoria,
      fecha: new Date().toISOString(),
      unidad: form.granel ? form.unidad : "",
      peso: form.granel ? parseFloat(form.peso) : "",
    });

    if (!success) return alert("Este producto ya está agregado");

    setForm({
      nombre: "",
      precio: 0,
      cantidad: 1,
      tienda: "",
      categoria: "",
      granel: false,
      peso: "",
      unidad: "",
    });
  };

  return (
    <div>
      <img
        src={carritoLogo}
        alt="Carrito"
        style={{
          width: "60px",
          marginBottom: "1rem",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Producto"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="precio"
          type="number"
          placeholder="Precio en COP"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          name="cantidad"
          type="number"
          placeholder="Cantidad"
          value={form.cantidad}
          onChange={handleChange}
        />

        <select
          name="tienda"
          value={form.tienda}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona tienda</option>
          <option value="d1">D1</option>
          <option value="ara">Ara</option>
          <option value="exito">Éxito</option>
          <option value="inter">Inter</option>
        </select>

        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona categoría</option>
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            name="granel"
            checked={form.granel}
            onChange={handleChange}
          />
          ¿A granel?
        </label>

        {form.granel && (
          <>
            <input
              name="peso"
              type="number"
              placeholder="Peso"
              value={form.peso}
              onChange={handleChange}
              required
            />
            <select
              name="unidad"
              value={form.unidad}
              onChange={handleChange}
              required
            >
              <option value="">Unidad</option>
              {UNIDADES.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </>
        )}

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default ProductForm;
