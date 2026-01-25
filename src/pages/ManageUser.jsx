import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import Modal from "@/components/reuse/Modal";
import ManageUserForm from "@/components/ManageUserForm";

// Importar servicios
import { fetchAllCustomers, deleteCustomer } from "@/services/customer.service";

const ManageUser = () => {
  const { user: authUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Cargar todos los usuarios del backend
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const usersData = await fetchAllCustomers();
        setUsers(usersData ?? []);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        toast.error("Error al cargar usuarios. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, []);

  // Manejar eliminación de usuario
  const handleDeleteUser = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    
    setDeletingId(id);
    try {
      await deleteCustomer(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      toast.success("Usuario eliminado correctamente");
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      toast.error(err.message || "Error al eliminar usuario");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
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
              placeholder="Buscar por nombre, email o rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e8c77]"
            />
          </div>
          <button
            onClick={() => {
              setEditingUser(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-[#5e8c77] text-white rounded-lg flex items-center justify-center hover:bg-[#4a7060] transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </button>
        </div>

        {/* ESTADO DE CARGA */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#5e8c77]" />
            <span className="ml-3 text-gray-600">Cargando usuarios...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">
              {searchTerm ? "No se encontraron usuarios con ese criterio" : "No hay usuarios registrados"}
            </p>
          </div>
        ) : (
          /* LISTADO DE USUARIOS */
          <div className="flex flex-col gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                {/* INFORMACIÓN DEL USUARIO */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{user.name || "Sin nombre"}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.rol === "ADMIN" 
                        ? "bg-purple-100 text-purple-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {user.rol || "USUARIO"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">ID:</span> {user.id}
                  </p>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() => {
                      setEditingUser(user);
                      setShowForm(true);
                    }}
                    className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1" /> Editar
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={deletingId === user.id || user.id === authUser?.id}
                    className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    title={user.id === authUser?.id ? "No puedes eliminar tu propio usuario" : ""}
                  >
                    {deletingId === user.id ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-1" />
                    )}
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL PARA CREAR/EDITAR USUARIO */}
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
          onSuccess={(updatedUser) => {
            // Actualizar la lista después de crear/editar
            if (editingUser) {
              // Editar usuario existente
              setUsers(prev => prev.map(u => 
                u.id === editingUser.id ? updatedUser : u
              ));
            } else {
              // Agregar nuevo usuario
              setUsers(prev => [updatedUser, ...prev]);
            }
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default ManageUser;