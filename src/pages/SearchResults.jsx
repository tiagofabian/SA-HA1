import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsByTerm } from "@/services/product.service";

const SearchResults = () => {
  const { term } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const data = await fetchProductsByTerm(term);
      setProducts(data);
      setLoading(false);
    };

    fetchResults();
  }, [term]);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!products.length) return <p className="text-center mt-10">No se encontraron productos</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8 max-w-[1600px] mx-auto gap-28 flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-8">Resultados para: "{term}"</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border rounded-xl shadow p-4 bg-white max-w-[300px] w-full mx-auto">
            <img src={p.imageUrls[0] || "/placeholder.png"} alt={p.name} className="w-full h-64 object-cover rounded-md mb-3" />
            <h3 className="font-medium text-lg">{p.name}</h3>
            <p className="text-gray-500 font-medium">${p.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

