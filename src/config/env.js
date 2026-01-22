export const API_URL = import.meta.env.VITE_API_URL_PROD;

if (!API_URL) {
  console.warn(
    "⚠️ VITE_API_URL no está definida. Revisa tu archivo .env"
  );
}