import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,
} from "@/api/product.api";

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
  if (!product?.name) {
    throw new Error("El nombre del producto es obligatorio");
  }

  if (product.price <= 0) {
    throw new Error("El precio debe ser mayor a 0");
  }

  return await createProduct(product);
};

/**
 * Actualizar producto
 */
export const editProduct = async (id, product) => {
  if (!id) {
    throw new Error("El id del producto es obligatorio");
  }

  return await updateProduct(id, product);
};

/**
 * Eliminar producto
 */
export const deleteProduct = async (id) => {
  if (!id) {
    throw new Error("El id del producto es obligatorio");
  }

  await removeProduct(id);
};