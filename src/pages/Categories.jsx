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
  const [hoveredCategory, setHoveredCategory] = useState(null); // estado simple para hover

  // Cargar categorías y productos
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
          const dedupedProducts = Array.from(
            new Map(products.map((p) => [p.id, p])).values()
          );
          categoryObj[cat.slug] = dedupedProducts;
          imagesObj[cat.slug] = cat.image ?? null;
        });

        setCategoryData(categoryObj);
        setCategoryImages(imagesObj);

        const pathSlug = location.pathname.split("/").pop();
        if (!slugs.includes(pathSlug)) {
          navigate(categoriesMeta[0].path, { replace: true });
        }

      } catch (err) {
        console.error("Error al obtener categorías:", err);
        setError("No se pudo cargar la data de categorías");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [location.pathname, navigate]);

  const currentSlug = location.pathname.split("/").pop() || categoriesMeta[0].path;
  const currentProducts = categoryData[currentSlug] ?? [];

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-6 lg:px-12 py-8 max-w-[1600px] mx-auto">
      <div className="text-center mb-16 mt-8">
        <h1 className="google-font-title text-4xl font-extrabold mb-2 text-[#1a1a1a]">
          Categorías Exclusivas
        </h1>
        <p className="Monserrat text-[#1a1a1a] max-w-2xl mx-auto">
          Explora nuestra selección de aros, pulseras, anillos y collares,
          creados con pasión y estilo para quienes buscan piezas únicas y llenas de personalidad.
        </p>
      </div>

      {/* GRID DE CATEGORÍAS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {categoriesMeta.map((cat) => {
          const imgSrc = categoryImages[cat.path];
          const isActive = currentSlug === cat.path;

          return (
            <NavLink
              key={cat.path}
              to={cat.path}
              onMouseEnter={() => setHoveredCategory(cat.path)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="relative w-full aspect-square"
            >
              <div
                className={`
                  w-full h-full rounded-2xl overflow-hidden
                  ring-1 ring-black/20 transition-all duration-300
                  ${isActive ? "ring-black/50 !ring-[1px]" : hoveredCategory === cat.path ? "ring-[#dadada]" : ""}
                  flex items-center justify-center
                `}
              >
                {/* Imagen */}
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                )}

                {/* Fondo dinámico expandible */}
                <div
                  className={`
                    absolute top-1/2 left-1/2 bg-black/30 rounded-2xl
                    transition-all duration-500 ease-in-out
                    transform -translate-x-1/2 -translate-y-1/2
                    ${isActive
                      ? "w-[0%] h-[0%]"   //
                      : "w-full h-full"}
                  `}
                ></div>

                {/* Texto siempre centrado */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span
                    className={`
                      google-font-text text-[1.2rem] !font-extrabold px-4 py-1
                      transition-all duration-500
                      ${isActive 
                        ? "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.99)]" 
                        : " text-white/70"}
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
