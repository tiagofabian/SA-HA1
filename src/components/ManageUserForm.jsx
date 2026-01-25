import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { update } from "@/services/auth.service";
import { toast } from "react-toastify";

const ManageUserForm = ({ initialData = null, onCancel }) => {
  const { user: authUser, updateUserContext } = useAuth();
  const isEditing = Boolean(initialData);

  const [user, setUser] = useState({
    name: "",
    email: "",
    rol: "USUARIO",
    active: true,
  });

  // precarga datos
  useEffect(() => {
    if (initialData) {
      setUser({
        name: initialData.name ?? "",
        email: initialData.email ?? "",
        rol: initialData.rol ?? "USUARIO", // string desde backend
        active: initialData.active ?? true,
      });
    } else {
      setUser({ name: "", email: "", rol: "USUARIO", active: true });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleActive = () => {
    setUser((prev) => ({ ...prev, active: !prev.active }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updated = await update(authUser.id, user); // PUT al backend
      updateUserContext(updated); // sincroniza contexto + sessionStorage
      toast.success("Usuario actualizado");
      onCancel(); // cierra modal
    } catch (err) {
      toast.error(err.message || "Error al actualizar usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Email - Solo lectura cuando se edita */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Email</label>
        {isEditing ? (
          // Cuando se está editando, mostrar como campo de solo lectura
          <div className="relative">
            <input
              type="email"
              name="email"
              value={user.email}
              readOnly
              className="border p-2 rounded w-full bg-gray-100 text-gray-600 cursor-not-allowed"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                No editable
              </span>
            </div>
          </div>
        ) : (
          // Cuando se está creando nuevo usuario, campo normal***************************
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        )}
      </div>

      {/* Rol */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Rol</label>
        <select
          name="rol"
          value={user.rol}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="USUARIO">Usuario</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Activo / Desactivado */}
      <div className="flex items-center gap-3">
        <label className="font-medium text-gray-700">Activo</label>
        <div
          onClick={handleToggleActive}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${user.active ? "bg-green-500" : "bg-gray-300"
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${user.active ? "translate-x-6" : "translate-x-0"
              }`}
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">
          Cancelar
        </button>
        <button type="submit" className="px-3 py-1 bg-[#5e8c77] text-white rounded">
          {isEditing ? "Guardar cambios" : "Crear usuario"}
        </button>
      </div>
    </form>
  );
};

export default ManageUserForm;