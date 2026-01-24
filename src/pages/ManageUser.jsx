import React, { useState, useEffect } from "react";
import { Plus, Search, Edit } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext"; // tu hook de auth
import Modal from "@/components/reuse/Modal";
import ManageUserForm from "@/components/ManageUserForm";

const ManageUser = () => {
  const { user: authUser } = useAuth(); // usuario logueado
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // solo mostramos al usuario logueado
    setUsers(authUser ? [authUser] : []);
  }, [authUser]);

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.rol?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Gestión de Usuarios</h1>
        <p className="text-gray-600 mb-6">Visualiza y administra la información de usuarios</p>

        {/* CONTROLES */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* LISTADO */}
        <div className="flex flex-col gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow px-6 py-4 flex flex-row justify-between items-stretch"
            >
              {/* COLUMNA IZQUIERDA: Info usuario */}
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-gray-500">Email: {user.email}</p>
                <p className="text-sm text-gray-500">Rol: {user.rol ?? "Sin rol"}</p>
                <p className="text-xs text-gray-400">ID: {user.id}</p>
              </div>

              {/* COLUMNA DERECHA: Botones */}
              <div className="flex flex-col justify-center ml-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingUser(user);
                      setShowForm(true);
                    }}
                    className="text-indigo-600 px-2 py-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    <Edit className="h-4 w-4 inline-block mr-1" /> Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingUser(null);
        }}
        title={editingUser ? "Editar Usuario" : "Nuevo Usuario"}
      >
        <ManageUserForm
          initialData={editingUser}
          onCancel={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default ManageUser;
