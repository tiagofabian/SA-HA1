import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Products from "./Products";
import { fetchAllProducts } from "@/services/product.service";

// ---------- Mocks ----------

const addToCartMock = vi.fn();

vi.mock("@/context/CartContext", () => ({
  useCart: () => ({
    cart: [],
    addToCart: addToCartMock,
    decreaseQuantity: vi.fn(),
  }),
}));

vi.mock("@/services/product.service", () => ({
  fetchAllProducts: vi.fn(),
}));

// ---------- Tests ----------

test("muestra productos cuando el fetch es exitoso", async () => {
  fetchAllProducts.mockResolvedValue([
    {
      id_product: 1,
      product_name: "Producto Test",
      price: 1000,
      imageUrl: "test.jpg",
      category_name: "Test",
    },
  ]);

  render(
    <BrowserRouter>
      <Products />
    </BrowserRouter>
  );

  expect(screen.getByText(/cargando productos/i)).toBeInTheDocument();

  expect(await screen.findByText("Producto Test")).toBeInTheDocument();
  expect(screen.getByText(/\$/)).toBeInTheDocument();
});

test("muestra mensaje de error si falla la carga de productos", async () => {
  fetchAllProducts.mockRejectedValue(new Error("Error de servidor"));

  render(
    <BrowserRouter>
      <Products />
    </BrowserRouter>
  );

  expect(
    await screen.findByText(/error al cargar productos/i)
  ).toBeInTheDocument();
});

test("agrega un producto al carrito al hacer click en Agregar", async () => {
  fetchAllProducts.mockResolvedValue([
    {
      id_product: 1,
      product_name: "Producto Test",
      price: 1000,
      imageUrl: "test.jpg",
      category_name: "Test",
    },
  ]);

  render(
    <BrowserRouter>
      <Products />
    </BrowserRouter>
  );

  const addButton = await screen.findByRole("button", {
    name: /agregar/i,
  });

  fireEvent.click(addButton);

  expect(addToCartMock).toHaveBeenCalledTimes(1);
  expect(addToCartMock).toHaveBeenCalledWith(
    expect.objectContaining({
      id_product: 1,
      product_name: "Producto Test",
    })
  );
});

