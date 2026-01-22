import {
  getAllCategorys,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
} from "@/api/category.api";

/* =========================
   OBTENER TODAS
========================= */
export const fetchAllCategorys = async () => {
  const categories = await getAllCategorys();

  // no hay lógica de negocio aquí (sin price)
  return categories;
};

/* =========================
   OBTENER POR ID
========================= */
export const fetchCategoryById = async (id) => {
  if (!id) {
    throw new Error("El id de la categoría es obligatorio");
  }

  return await getCategoryById(id);
};

/* =========================
   CREAR
========================= */
export const saveCategory = async (category) => {
  if (!category) {
    throw new Error("Los datos de la categoría son obligatorios");
  }

  if (!category.category_name?.trim()) {
    throw new Error("El nombre de la categoría es obligatorio");
  }

  const payload = {
    category_name: category.category_name,
    description: category.description ?? "",
  };

  const createdCategory = await createCategory(payload);

  if (!createdCategory) {
    throw new Error("No se pudo crear la categoría");
  }

  return createdCategory;
};

/* =========================
   EDITAR
========================= */
export const editCategory = async (id, category) => {
  if (!id) {
    throw new Error("El id de la categoría es obligatorio");
  }

  const payload = {
    category_name: category.category_name,
    description: category.description ?? "",
  };

  const updatedCategory = await updateCategory(id, payload);

  if (!updatedCategory) {
    throw new Error("No se pudo actualizar la categoría");
  }

  return updatedCategory;
};

/* =========================
   ELIMINAR
========================= */
export const deleteCategory = async (id) => {
  if (!id) {
    throw new Error("El id de la categoría es obligatorio");
  }

  await removeCategory(id);

  return true;
};
