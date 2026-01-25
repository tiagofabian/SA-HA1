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
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold mb-2 text-[#1a1a1a]">
          Categorías Exclusivas
        </h1>
        <p className="text-[#1a1a1a] max-w-2xl mx-auto">
          Explora nuestra selección de aros, pulseras, anillos y collares,
          creados con pasión y estilo para quienes buscan piezas únicas y llenas de personalidad.
        </p>
      </div>

      {/* GRID DE CATEGORÍAS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categoriesMeta.map((cat) => {
          const imgSrc = categoryImages[cat.path];
          const isActive = currentSlug === cat.path;

          // Difuminado para inactivos:
          // - Siempre que la categoría no sea activa
          // - Ya sea que haya hover sobre otra o no haya hover sobre ninguna
          const shouldBlur = !isActive;

          return (
            <NavLink
              key={cat.path}
              to={cat.path}
              className="relative w-full aspect-square overflow-hidden rounded-xl"
              onMouseEnter={() => setHoveredCategory(cat.path)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Imagen */}
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt={cat.name}
                  className={`w-full h-full object-cover transition-all duration-500
                    ${shouldBlur
                      ? "opacity-80 blur-[4px] scale-[97%]"
                      : "opacity-100 blur-0 scale-100"
                    }`}
                />
              )}
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
