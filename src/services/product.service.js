import {
  searchProducts,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,
} from "@/api/product.api";

/**
 * Buscar productos por término
 */
export const fetchProductsByTerm = async (term) => {
  const products = await searchProducts(term);

  return products.map((p) => ({
    ...p,
    price: Number(p.price),
    imageUrls: p.imageUrls ?? [],
  }));
};

/**
 * Obtener todos los productos
 */
export const fetchAllProducts = async () => {
  const products = await getAllProducts();

  return products.map((p) => ({
    ...p,
    price: Number(p.price),
    imageUrls: p.imageUrls ?? [],
  }));
};

/**
 * Obtener producto por ID
 */
export const fetchProductById = async (id) => {
  if (!id) throw new Error("El id del producto es obligatorio");

  const product = await getProductById(id);
  return { ...product, imageUrls: product.imageUrls ?? [] };
};

/**
 * Crear producto
 */
export const saveProduct = async (product) => {
  if (!product) throw new Error("Los datos del producto son obligatorios");
  if (!product.name?.trim()) throw new Error("El nombre del producto es obligatorio");
  if (product.price == null || Number(product.price) <= 0) throw new Error("El precio debe ser mayor a 0");
  if (product.stock != null && Number(product.stock) < 0) throw new Error("El stock no puede ser negativo");
  if (!product.categoryId || Number(product.categoryId) <= 0) throw new Error("La categoría es obligatoria");

  const payload = {
    name: product.name,
    price: Number(product.price),
    stock: product.stock != null ? Number(product.stock) : null,
    description: product.description ?? "",
    id_collection: product.id_collection, // 👈 NUEVO
    imageUrl: product.imageUrl ?? "",
    id_category: product.id_category,
  };

  return await createProduct(payload);
};

/**
 * Actualizar producto
 */
export const editProduct = async (id, product) => {
  if (!id) throw new Error("El id del producto es obligatorio");

  if (!product.product_name?.trim()) {
    throw new Error("El nombre del producto es obligatorio");
  }

  if (product.price == null || Number(product.price) <= 0) {
    throw new Error("El precio debe ser mayor a 0");
  }

  if (product.stock != null && Number(product.stock) < 0) {
    throw new Error("El stock no puede ser negativo");
  }

  if (product.id_category != null && Number(product.id_category) <= 0) {
    throw new Error("La categoría no es válida");
  }

  const payload = {
    product_name: product.product_name,
    price: Number(product.price),
    stock: product.stock != null ? Number(product.stock) : null,
    description: product.description ?? "",
    id_collection: product.id_collection, // 👈 CLAVE
    imageUrl: product.imageUrl ?? "",
    id_category: product.id_category,
  };

  const updatedProduct = await updateProduct(id, payload);

  const updatedProduct = await updateProduct(id, payload);
  if (!updatedProduct) throw new Error("No se pudo actualizar el producto");

  return updatedProduct;
};


/**
 * Eliminar producto
 */
export const deleteProduct = async (id) => {
  if (!id) throw new Error("El id del producto es obligatorio");

  const response = await removeProduct(id);
  if (response === false) throw new Error("No se pudo eliminar el producto");

  return true;
};
