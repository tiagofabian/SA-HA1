const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@ui": path.resolve(__dirname, "src/components/ui"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@context": path.resolve(__dirname, "src/context"),
    },
  },
};