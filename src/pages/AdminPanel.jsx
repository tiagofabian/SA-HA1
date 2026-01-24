import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Users, Box, Layers, Grid, Menu, ChevronLeft, ChevronRight } from "lucide-react";

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(true); // estado del sidebar

  const menuItems = [
    { name: "Usuarios", path: "/admin/gestion-usuario", icon: Users },
    { name: "Productos", path: "/admin/gestion-producto", icon: Box },
    { name: "Categorías", path: "/admin/gestion-categoria", icon: Layers },
    { name: "Colecciones", path: "/admin/gestion-coleccion", icon: Grid },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-white shadow-md flex flex-col transition-all duration-300`}
      >
        {/* HEADER / TOGGLE */}
        <div className="flex items-center justify-between p-4 border-b">
          {isOpen && <h1 className="text-2xl font-bold text-[#5e8c77]">Panel Admin</h1>}

          {/* Toggle desktop */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden sm:flex p-1 rounded hover:bg-gray-100"
          >
            {isOpen ? (
              <ChevronLeft className="h-6 w-6 text-[#5e8c77]" />
            ) : (
              <ChevronRight className="h-6 w-6 text-[#5e8c77]" />
            )}
          </button>

          {/* Toggle mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-1 rounded hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-[#5e8c77]" />
          </button>
        </div>

        {/* MENU ITEMS */}
        <nav className="flex flex-col mt-4 gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#5e8c77] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {isOpen && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-2 py-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
