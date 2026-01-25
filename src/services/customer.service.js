import {
  getAllCustomers,
  getCustomerById,
  // createCustomer,
  updateCustomer,
  removeCustomer,
  getCustomerByEmail,
} from "@/api/customer.api";

/**
 * Obtener todos los customeros
 */
export const fetchAllCustomers = async () => {
  const customers = await getAllCustomers();

  // Mapear campos del backend (español) a frontend (inglés)
  return customers.map((customer) => ({
    id: customer.id,
    name: customer.nombre,      // "nombre" → "name"
    email: customer.email,     // "correo" → "email"
    phone: customer.phone,   // "telefono" → "phone"
    rol: customer.rol || "USUARIO", // Si no viene rol, por defecto USUARIO
  }));
};

/**
 * Obtener usuario por ID
 */
export const fetchCustomerById = async (id) => {
  if (!id) {
    throw new Error("El id del usuario es obligatorio");
  }

  return await getCustomerById(id);
};

/**
 * Obtener usuario por Email
 */
export const fetchCustomerByEmail = async (email) => {
  if (!email) {
    throw new Error("El email del usuario es obligatorio");
  }

  return await getCustomerByEmail(email);
};

/**
 * Crear customero
 */
// export const saveCustomer = async (customer) => {
//   if (!customer?.name) {
//     throw new Error("El nombre del usuario es obligatorio");
//   }

//   if (customer.price <= 0) {
//     throw new Error("El precio debe ser mayor a 0");
//   }

//   return await createCustomer(customer);
// };

/**
 * Actualizar customero
 */
export const editCustomer = async (id, customer) => {
  if (!id) {
    throw new Error("El id del usuario es obligatorio");
  }

  return await updateCustomer(id, customer);
};

/**
 * Eliminar customero
 */
export const deleteCustomer = async (id) => {
  if (!id) {
    throw new Error("El id del usuario es obligatorio");
  }

  await removeCustomer(id);
};