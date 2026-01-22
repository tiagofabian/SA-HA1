export const CATEGORY_RULES = {
  collares: 1,
  anillos: 2,
  aros: 3,
  pulseras: 4,
  dijes: 5,
};

export const getAuthToken = () => {
  const raw = sessionStorage.getItem("auth_user");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return parsed.token;
  } catch {
    return null;
  }
};

export const capitalizeFirst = (value = "") =>
  value
    .trim()
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
