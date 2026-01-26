import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { update } from "@/services/auth.service";
import { toast } from "react-toastify";

const ManageUserForm = ({
  initialData = null,
  onCancel = () => { },
  onSuccess = () => { }  // ← AGREGADO con valor por defecto
}) => {
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
        phone: initialData.phone ?? "",
        rol: initialData.rol ?? "USUARIO",
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
    console.log("📝 handleSubmit ejecutado");

    try {
      const userData = isEditing
        ? {
          name: user.name,
          email: null,
          phone: user.phone,
          rol: user.rol,
          active: user.active,
        }
        : {
          name: user.name,
          email: user.email,
          phone: user.phone,
          rol: user.rol,
          active: user.active,
        };

      const userIdToUpdate = isEditing ? initialData.id : undefined;
      const updated = await update(userIdToUpdate, userData);

      // Transformar respuesta
      const successData = {
        id: updated.id || initialData.id,
        name: updated.name,
        email: updated.email,
        rol: updated.rol,
        active: updated.active,
      };

      console.log("🚀 Llamando onSuccess con:", successData);
      onSuccess(successData);  // ← AHORA onSuccess existe

      // Actualizar contexto solo si es el usuario logueado
      if (isEditing && initialData.id === authUser.id) {
        updateUserContext(updated);
      }

      // Cerrar modal
      onCancel();

    } catch (err) {
      console.error("💥 Error en handleSubmit:", err);
      toast.error(err.message || `Error al ${isEditing ? 'actualizar' : 'crear'} usuario`);
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
      {/* Telefono */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Teléfono</label>
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
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