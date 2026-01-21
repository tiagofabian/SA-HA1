import React, { useEffect, useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

const CATEGORY_STORAGE_KEY = "categories";

const ProductForm = ({ initialData = null, onSubmit, onCancel }) => {
  const isEditing = Boolean(initialData);

  const [product, setProduct] = useState({
    nombre: "",
    precio: "",
    categoria: 0, // 👈 number
    descripcion: "",
    imagen: "",
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedCategories = localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }

    if (initialData) {
      setProduct({
        nombre: initialData.name || "",
        precio: initialData.price || "",
        categoria: initialData.categoryId || 0,
        descripcion: initialData.description || "",
        imagen: initialData.image || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "categoria"
          ? Number(value)
          : files
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!product.nombre.trim()) newErrors.nombre = "Nombre requerido";
    if (!product.descripcion.trim())
      newErrors.descripcion = "Descripción requerida";
    if (!product.categoria || product.categoria <= 0)
      newErrors.categoria = "Categoría requerida";
    if (!product.precio || Number(product.precio) <= 0)
      newErrors.precio = "Precio válido requerido";
    if (!product.imagen) newErrors.imagen = "Imagen requerida";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre */}
      <input
        type="text"
        name="nombre"
        value={product.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="border p-2 rounded w-full"
      />

      {/* Precio */}
      <input
        type="number"
        name="precio"
        value={product.precio}
        onChange={handleChange}
        placeholder="Precio"
        className="border p-2 rounded w-full"
      />

      {/* Categoría */}
      <select
        name="categoria"
        value={product.categoria}
        onChange={handleChange}
        disabled={isEditing}
        className="border p-2 rounded w-full"
      >
        <option value={0}>Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>

      {/* Descripción */}
      <textarea
        name="descripcion"
        value={product.descripcion}
        onChange={handleChange}
        rows={3}
        className="border p-2 rounded w-full"
      />

      {/* Imagen */}
      <FileUploaderRegular
        pubkey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY}
        multiple={false}
        imgOnly
        onFileUploadSuccess={(file) =>
          setProduct((prev) => ({
            ...prev,
            imagen: file.cdnUrl,
          }))
        }
      />

      {product.imagen && (
        <img
          src={product.imagen}
          alt="preview"
          className="w-32 h-32 object-cover rounded"
        />
      )}

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit">
          {isEditing ? "Guardar cambios" : "Crear producto"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
