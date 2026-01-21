export const CATEGORY_ID_RULES = {
  collares: 1000,
  anillos: 2000,
  aros: 3000,
  pulseras: 4000,
  dijes: 5000,
};

export const generateProductId = (categoryId, productos) => {
  if (!categoryId || categoryId <= 0) {
    throw new Error("categoryId inválido");
  }

  const baseId = Math.floor(categoryId / 1000) * 1000;

  const ids = productos
    .filter(
      (p) => Math.floor(p.categoryId / 1000) === baseId / 1000
    )
    .map((p) => p.id);

  return ids.length ? Math.max(...ids) + 1 : baseId;
};