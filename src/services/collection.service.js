import {
  getAllCollections,
  getCollectionsWithProductsBySlug,
  getCollectionsBySlug,
  getCollectionById,
  createCollection,
  updateCollection,
  removeCollection,
} from "@/api/collection.api";

/* =========================
   OBTENER TODAS
========================= */
export const fetchAllCollections = async () => {
  return await getAllCollections();
};

/* =========================
   OBTENER COLECCIONES SIN PRODUCTOS POR SLUG
========================= */
export const fetchCollectionsBySlug = async (slugs) => {
  return await getCollectionsBySlug(slugs);
};

/* =========================
   OBTENER COLECCIONES CON SUS PRODUCTOS POR SLUG
========================= */
export const fetchCollectionsWithProductsBySlug = async (slugs) => {
  return await getCollectionsWithProductsBySlug(slugs);
};

/* =========================
   OBTENER POR ID
========================= */
export const fetchCollectionById = async (id) => {
  if (!id) {
    throw new Error("El id de la colección es obligatorio");
  }

  return await getCollectionById(id);
};

/* =========================
   CREAR
========================= */
export const saveCollection = async (collection) => {
  if (!collection) {
    throw new Error("Los datos de la colección son obligatorios");
  }
  if (!collection.name) {
    throw new Error("El nombre de la colección es obligatorio");
  }

  const payload = {
    name: collection.name.trim(),
    description: collection.description?.trim() ?? "",
    image: collection.image?.trim() ?? "", // ← nuevo campo
  };

  const created = await createCollection(payload);

  if (!created) {
    throw new Error("No se pudo crear la colección");
  }

  return created;
};

/* =========================
   ACTUALIZAR
========================= */
export const editCollection = async (id, collection) => {
  if (!id) {
    throw new Error("El id de la colección es obligatorio");
  }
  if (!collection || !collection.name) {
    throw new Error("El nombre de la colección es obligatorio");
  }

  const payload = {
    name: collection.name.trim(),
    description: collection.description?.trim() ?? "",
    image: collection.image?.trim() ?? "", // ← nuevo campo
  };

  const updated = await updateCollection(id, payload);

  if (!updated) {
    throw new Error("No se pudo actualizar la colección");
  }

  return updated;
};

/* =========================
   ELIMINAR
========================= */
export const deleteCollection = async (id) => {
  if (!id) {
    throw new Error("El id de la colección es obligatorio");
  }

  await removeCollection(id);
  return true;
};
