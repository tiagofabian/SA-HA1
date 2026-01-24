import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllProducts } from "@/services/product.service";
import { fetchAllCategories } from "@/services/category.service";
import { fetchAllCollections } from "@/services/collection.service";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [productsRes, categoriesRes, collectionsRes] =
          await Promise.all([
            fetchAllProducts(),
            fetchAllCategories(),
            fetchAllCollections(),
          ]);

        setProducts(productsRes);
        setCategories(categoriesRes);
        setCollections(collectionsRes);
      } catch (err) {
        console.error("Error cargando data global", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <ProductContext.Provider
      value={{ categories, setCategories, collections, setCollections, products, setProducts, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);