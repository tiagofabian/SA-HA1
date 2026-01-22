export const API_URL = import.meta.env.VITE_API_URL_DEV;

if (!API_URL) {
  console.warn(
    "⚠️ VITE_API_URL no está definida. Revisa tu archivo .env"
  );
}