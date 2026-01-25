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


export const getBGColorTag = (slug) => {
  switch (slug) {
    case "sakura":
      return "bg-pink-200"; // 

    case "anime":
      return "bg-indigo-200"; // 

    case "videojuegos":
      return "bg-violet-200"; // 

    case "cultura_japonesa":
      return "bg-red-200"; // 

    default:
      return "bg-gray-300"; //
  }
};
