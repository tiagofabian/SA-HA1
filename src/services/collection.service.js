import {
    getAllCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    removeCollection,
} from "@/api/collection.api";

/* =========================
   OBTENER TODAS
========================= */
export const fetchAllCollections = async () => {
    const categories = await getAllCollections();

    // no hay lógica de negocio aquí (sin price)
    return categories;
};

/* =========================
   OBTENER POR ID
========================= */
export const fetchCollectionById = async (id) => {
    if (!id) {
        throw new Error("El id de la categoría es obligatorio");
    }

    return await getCollectionById(id);
};

/* =========================
   CREAR
========================= */
export const saveCollection = async (collection) => {
    if (!collection) {
        throw new Error("Los datos de la categoría son obligatorios");
    }

    if (!collection.collection_name?.trim()) {
        throw new Error("El nombre de la categoría es obligatorio");
    }

    const payload = {
        collection_name: collection.collection_name,
        description: collection.description ?? "",
    };

    const createdCollection = await createCollection(payload);

    if (!createdCollection) {
        throw new Error("No se pudo crear la categoría");
    }

    return createdCollection;
};

/* =========================
   EDITAR
========================= */
export const editCollection = async (id, collection) => {
    if (!id) {
        throw new Error("El id de la categoría es obligatorio");
    }

    const payload = {
        collection_name: collection.collection_name,
        description: collection.description ?? "",
    };

    const updatedCollection = await updateCollection(id, payload);

    if (!updatedCollection) {
        throw new Error("No se pudo actualizar la categoría");
    }

    return updatedCollection;
};

/* =========================
   ELIMINAR
========================= */
export const deleteCollection = async (id) => {
    if (!id) {
        throw new Error("El id de la categoría es obligatorio");
    }

    await removeCollection(id);

    return true;
};
