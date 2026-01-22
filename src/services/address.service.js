import {
  getAllAddresss,
  getAddressById,
  createAddress,
  updateAddress,
  removeAddress,
  getAddressByIdCustomer,
} from "@/api/address.api";

/* =========================
   OBTENER TODAS
========================= */
export const fetchAllAddresss = async () => {
  const categories = await getAllAddresss();

  // no hay lógica de negocio aquí (sin price)
  return categories;
};

/* =========================
   OBTENER POR ID
========================= */
export const fetchAddressById = async (id) => {
  if (!id) {
    throw new Error("El id de la dirección es obligatorio");
  }

  return await getAddressById(id);
};


export const fetchAddressByIdCustomer = async (id) => {
  if (!id) {
    throw new Error("El id de la dirección es obligatorio");
  }

  return await getAddressByIdCustomer(id);
};

/* =========================
   CREAR
========================= */
export const saveAddress = async (address) => {
  if (!address) {
    throw new Error("Los datos de la dirección son obligatorios");
  }

  if (!address.address_name?.trim()) {
    throw new Error("El nombre de la categoría es obligatorio");
  }

  const payload = {
    address_name: address.address_name,
    description: address.description ?? "",
  };

  const createdAddress = await createAddress(payload);

  if (!createdAddress) {
    throw new Error("No se pudo crear la dirección");
  }

  return createdAddress;
};

/* =========================
   EDITAR
========================= */
export const editAddress = async (id, address) => {
  if (!id) {
    throw new Error("El id de la dirección es obligatorio");
  }

  const payload = {
    address_name: address.address_name,
    description: address.description ?? "",
  };

  const updatedAddress = await updateAddress(id, payload);

  if (!updatedAddress) {
    throw new Error("No se pudo actualizar la dirección");
  }

  return updatedAddress;
};

/* =========================
   ELIMINAR
========================= */
export const deleteAddress = async (id) => {
  if (!id) {
    throw new Error("El id de la categoría es obligatorio");
  }

  await removeAddress(id);

  return true;
};
