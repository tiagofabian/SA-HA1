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

  // Ejemplo de lógica de negocio
  return customers.map((p) => ({
    ...p,
    price: Number(p.price),
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