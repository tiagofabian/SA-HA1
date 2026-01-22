import React, { useEffect, useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

const ProductForm = ({ initialData = null, categories,collections, onSubmit, onCancel }) => {
  const isEditing = Boolean(initialData);

  const [product, setProduct] = useState({
    nombre: "",
    precio: "",
    categoria: 0,
    coleccion: 0,   // 👈 NUEVO
    descripcion: "",
    imageUrl: "", // ← aquí usamos imageUrl
    stock: "",
  });
  const [errors, setErrors] = useState({});

  /* =========================
     CARGA INICIAL
  ========================= */
  useEffect(() => {
    if (initialData) {
      setProduct({
        nombre: initialData.product_name ?? "",
        precio: initialData.price ?? "",
        categoria: initialData.id_category ?? 0,
        descripcion: initialData.description ?? "",
        imageUrl: initialData.imageUrl ?? "", // ← adaptado
        coleccion: initialData.id_collection ?? 0, // 👈 NUEVO
        stock: initialData.stock ?? "",
      });
    }
  }, [initialData]);

  /* =========================
     CAMBIOS DE INPUT
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "categoria" || name === "coleccion" ? Number(value) : value,
    }));  // 👈 NUEVO
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!product.nombre.trim()) newErrors.nombre = "Nombre requerido";
    if (!product.descripcion.trim()) newErrors.descripcion = "Descripción requerida";
    if (!product.precio || Number(product.precio) <= 0) newErrors.precio = "Precio válido requerido";
    if (product.stock !== "" && Number(product.stock) < 0) newErrors.stock = "El stock no puede ser negativo";
    if (!product.imageUrl.trim()) newErrors.imageUrl = "Imagen requerida"; // validación de imageUrl
    if (!product.coleccion || Number(product.coleccion) <= 0) newErrors.coleccion = "Colección requerida"; // 👈 NUEVO

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
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
      {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}

      {/* Precio */}
      <input
        type="number"
        name="precio"
        value={product.precio}
        onChange={handleChange}
        placeholder="Precio"
        className="border p-2 rounded w-full"
      />
      {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}

      {/* Stock */}
      <input
        type="number"
        name="stock"
        value={product.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="border p-2 rounded w-full"
      />
      {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}

      {/* Categoría */} 
      <select
        name="categoria"
        value={product.categoria}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value={0}>Selecciona una categoría</option>
        {categories?.map((cat) => (
          <option key={cat.id_category} value={cat.id_category}>
            {cat.category_name}
          </option>
        ))}
      </select>
      
      {/* Colección */} 
      <select
        name="coleccion"
        value={product.coleccion} 
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value={0}>Selecciona una colección</option>
        {collections?.map((col) => (
          <option key={col.id_collection} value={col.id_collection}>
            {col.collection_name}
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
      {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}

      {/* Imagen */}
      <FileUploaderRegular
        pubkey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY}
        multiple={true}
        imgOnly
        onFileUploadSuccess={(file) =>
          setProduct((prev) => ({
            ...prev,
            imageUrl: file.cdnUrl, // ← guardamos el URL en imageUrl
          }))
        }
      />

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt="preview"
          className="w-32 h-32 object-cover rounded"
        />
      )}
      {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}

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
