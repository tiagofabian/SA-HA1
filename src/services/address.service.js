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
export const fetchAllAddress = async () => {
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
  if (!address.id_customer) {
    throw new Error("No se puede crear dirección sin un id_customer válido");
  }

  const payload = {
    address: address.address || null,
    city: address.city || null,
    region: address.region || null,
    zip_code: address.zip_code != null ? Number(address.zip_code) : null,
    id_customer: address.id_customer,
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
    address: address.address || null,
    city: address.city || null,
    region: address.region || null,
    zip_code: address.zip_code != null ? Number(address.zip_code) : null,
    id_customer: address.id_customer,
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
    throw new Error("El id de la dirección es obligatorio");
  }

  await removeAddress(id);

  return true;
};
