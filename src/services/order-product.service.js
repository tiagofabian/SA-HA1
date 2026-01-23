import {
  getAllOrderProducts,
  getOrderProductByIds,
  createOrderProduct,
  updateOrderProduct,
  removeOrderProduct,
} from "@/api/orderProduct.api";

/* =========================
   LISTAR
========================= */
export const fetchAllOrderProducts = async () => {
  return await getAllOrderProducts();
};

/* =========================
   OBTENER POR IDS
========================= */
export const fetchOrderProductByIds = async (
  orderId,
  productId
) => {
  if (!orderId || !productId) {
    throw new Error("orderId y productId son obligatorios");
  }

  return await getOrderProductByIds(orderId, productId);
};

/* =========================
   CREAR
========================= */
export const saveOrderProduct = async ({
  orderId,
  productId,
  quantity,
  price,
}) => {
  if (!orderId || !productId) {
    throw new Error("orderId y productId son obligatorios");
  }

  return await createOrderProduct({
    orderId,
    productId,
    quantity,
    price,
  });
};

/* =========================
   ACTUALIZAR
========================= */
export const editOrderProduct = async (
  orderId,
  productId,
  data
) => {
  if (!orderId || !productId) {
    throw new Error("orderId y productId son obligatorios");
  }

  return await updateOrderProduct(
    orderId,
    productId,
    {
      quantity: data.quantity,
      price: data.price,
    }
  );
};

/* =========================
   ELIMINAR
========================= */
export const deleteOrderProduct = async (
  orderId,
  productId
) => {
  if (!orderId || !productId) {
    throw new Error("orderId y productId son obligatorios");
  }

  await removeOrderProduct(orderId, productId);
  return true;
};
