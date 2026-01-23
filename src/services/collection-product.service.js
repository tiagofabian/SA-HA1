import {
  getAllProductCollections,
  getProductCollectionByIds,
  createProductCollection,
  removeProductCollection,
} from "@/api/productCollection.api";

/* =========================
   LISTAR TODAS
========================= */
export const fetchAllProductCollections = async () => {
  return await getAllProductCollections();
};

/* =========================
   OBTENER POR IDS
========================= */
export const fetchProductCollectionByIds = async (
  productId,
  collectionId
) => {
  if (!productId || !collectionId) {
    throw new Error("productId y collectionId son obligatorios");
  }

  return await getProductCollectionByIds(
    productId,
    collectionId
  );
};

/* =========================
   CREAR RELACIÓN
========================= */
export const saveProductCollection = async ({
  productId,
  collectionId,
}) => {
  if (!productId || !collectionId) {
    throw new Error("productId y collectionId son obligatorios");
  }

  const payload = {
    productId,
    collectionId,
  };

  return await createProductCollection(payload);
};

/* =========================
   ELIMINAR RELACIÓN
========================= */
export const deleteProductCollection = async (
  productId,
  collectionId
) => {
  if (!productId || !collectionId) {
    throw new Error("productId y collectionId son obligatorios");
  }

  await removeProductCollection(productId, collectionId);
  return true;
};
