import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import LoginForm from "./LoginForm";

/* =======================
   M O C K S
======================= */

const navigateMock = vi.fn();
const loginMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: loginMock,
  }),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

import { toast } from "react-toastify";

/* =======================
   T E S T S
======================= */

beforeEach(() => {
  vi.clearAllMocks();
});

test("login exitoso navega al home", async () => {
  loginMock.mockResolvedValue({
    ok: true,
    user: { name: "Belén" },
  });

  render(<LoginForm />);

  fireEvent.change(screen.getByPlaceholderText("tu@email.com"), {
    target: { value: "test@test.com" },
  });

  fireEvent.change(screen.getByPlaceholderText("••••••••"), {
    target: { value: "123456" },
  });

  fireEvent.click(
    screen.getByRole("button", { name: "Ingresar" })
  );

  await waitFor(() => {
    expect(loginMock).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});

test("login incorrecto muestra error y no navega", async () => {
  loginMock.mockResolvedValue({
    ok: false,
    message: "Credenciales incorrectas",
  });

  render(<LoginForm />);

  fireEvent.change(screen.getByPlaceholderText("tu@email.com"), {
    target: { value: "fail@test.com" },
  });

  fireEvent.change(screen.getByPlaceholderText("••••••••"), {
    target: { value: "wrong" },
  });

  fireEvent.click(
    screen.getByRole("button", { name: "Ingresar" })
  );

  await waitFor(() => {
    expect(loginMock).toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalled();
  });
});

test("no envía login si los campos están vacíos", async () => {
  render(<LoginForm />);

  fireEvent.click(
    screen.getByRole("button", { name: "Ingresar" })
  );

  await waitFor(() => {
    expect(loginMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});
