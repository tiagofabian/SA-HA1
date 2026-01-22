import {
  searchProducts,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,
} from "@/api/product.api";


/**
 * Buscar por termino
 */


export const fetchProductsByTerm = async (term) => {
  const products = await searchProducts(term);

  // Ejemplo de lógica de negocio: asegurar que price sea número
  return products.map((p) => ({
    ...p,
    price: Number(p.price),
  }));
};
/**
 * Obtener todos los productos
 */
export const fetchAllProducts = async () => {
  const products = await getAllProducts();

  // Ejemplo de lógica de negocio
  return products.map((p) => ({
    ...p,
    price: Number(p.price),
  }));
};

/**
 * Obtener producto por ID
 */
export const fetchProductById = async (id) => {
  if (!id) {
    throw new Error("El id del producto es obligatorio");
  }

  return await getProductById(id);
};

/**
 * Crear producto
 */
export const saveProduct = async (product) => {
  if (!product) {
    throw new Error("Los datos del producto son obligatorios");
  }

  if (!product.product_name?.trim()) {
    throw new Error("El nombre del producto es obligatorio");
  }

  if (product.price == null || Number(product.price) <= 0) {
    throw new Error("El precio debe ser mayor a 0");
  }

  if (product.stock != null && Number(product.stock) < 0) {
    throw new Error("El stock no puede ser negativo");
  }

  // categoría opcional (como dijiste antes)
  if (product.id_category != null && Number(product.id_category) <= 0) {
    throw new Error("La categoría no es válida");
  }

  const payload = {
    product_name: product.product_name,
    price: Number(product.price),
    stock: product.stock != null ? Number(product.stock) : null,
    description: product.description ?? "",
    imageUrl: product.imageUrl ?? "",
    id_category: product.id_category,
  };

  const createdProduct = await createProduct(payload);

  if (!createdProduct) {
    throw new Error("No se pudo crear el producto");
  }

  return createdProduct;
};


/**
 * Actualizar producto
 */
export const editProduct = async (id, product) => {
  if (!id) {
    throw new Error("El id del producto es obligatorio");
  }

  const updatedProduct = await updateProduct(id, product);

  if (!updatedProduct) {
    throw new Error("No se pudo actualizar el producto");
  }

  return updatedProduct;
};

/**
 * Eliminar producto
 */
export const deleteProduct = async (id) => {
  if (!id) {
    throw new Error("El id del producto es obligatorio");
  }

  const response = await removeProduct(id);

  // si tu backend devuelve algo, mejor validarlo
  if (response === false) {
    throw new Error("No se pudo eliminar el producto");
  }

  return true;
};