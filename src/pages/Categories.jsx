import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchCategoriesWithProductsBySlug } from "@/services/category.service";

const Categories = () => {
  const categoriesMeta = [
    { name: "Anillos", path: "anillos" },
    { name: "Aros", path: "aros" },
    { name: "Pulseras", path: "pulseras" },
    { name: "Collares", path: "collares" },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({});
  const [categoryImages, setCategoryImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // foco visual (hover o activo)
  const [focusedCategory, setFocusedCategory] = useState(
    categoriesMeta[0].path
  );

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const slugs = categoriesMeta.map((c) => c.path);
        const data = await fetchCategoriesWithProductsBySlug(slugs);

        const categoryObj = {};
        const imagesObj = {};

        data.forEach((cat) => {
          const products = cat.products ?? [];

          // ✅ DEDUPLICACIÓN POR CATEGORÍA (por product.id)
          const uniqueProducts = products.filter(
            (product, index, self) =>
              index === self.findIndex((p) => p.id === product.id)
          );

          categoryObj[cat.slug] = uniqueProducts;
          imagesObj[cat.slug] = cat.image ?? null;
        });

        setCategoryData(categoryObj);
        setCategoryImages(imagesObj);

        const pathSlug = location.pathname.split("/").pop();
        if (!slugs.includes(pathSlug)) {
          navigate(categoriesMeta[0].path, { replace: true });
        } else {
          setFocusedCategory(pathSlug);
        }
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la data de categorías");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [location.pathname, navigate]);

  const currentSlug =
    location.pathname.split("/").pop() || categoriesMeta[0].path;

  const currentProducts = categoryData[currentSlug] ?? [];

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-6 lg:px-12 py-8 max-w-[1600px] mx-auto">
      {/* HEADER */}
      <div className="text-center mb-16 mt-8">
        <h1 className="google-font-title text-4xl font-extrabold mb-2 text-[#1a1a1a]">
          Categorías Exclusivas
        </h1>
        <p className="Monserrat text-[#1a1a1a] max-w-2xl mx-auto">
          Explora nuestra selección de joyas únicas
        </p>
      </div>

      {/* GRID DE CATEGORÍAS */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-20"
        onMouseLeave={() => setFocusedCategory(currentSlug)}
      >
        {categoriesMeta.map((cat) => {
          const imgSrc = categoryImages[cat.path];
          const isFocused = focusedCategory === cat.path;

          return (
            <NavLink
              key={cat.path}
              to={cat.path}
              onMouseEnter={() => setFocusedCategory(cat.path)}
              className="relative w-full aspect-square"
            >
              <div
                className={`
                  relative w-full h-full rounded-2xl overflow-hidden
                  ring-1 transition-all duration-300
                  ${isFocused ? "ring-black/40" : "ring-black/20"}
                `}
              >
                {/* Imagen */}
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={cat.name}
                    className={`
                      w-full h-full object-cover transition-all duration-700 ease-out
                      ${isFocused ? "scale-100 blur-0" : "scale-105 blur-[1.5px]"}
                    `}
                  />
                )}

                {/* Overlay */}
                <div
                  className={`
                    absolute inset-0 transition-all duration-700
                    ${isFocused ? "bg-black/15" : "bg-black/25"}
                  `}
                />

                {/* Texto */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span
                    className={`
                      google-font-text text-[1.25rem] !font-extrabold px-4 py-1
                      transition-all duration-500
                      ${
                        isFocused
                          ? "text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                          : "text-white/75"
                      }
                    `}
                  >
                    {cat.name}
                  </span>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* OUTLET */}
      <div className="p-6 bg-white rounded-xl shadow-md min-h-[400px]">
        {loading && <p>Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <Outlet context={{ categoryData: currentProducts }} />
        )}
      </div>
    </div>
  );
};

export default Categories;
