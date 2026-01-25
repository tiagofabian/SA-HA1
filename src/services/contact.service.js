import {
    createContact,
    getAllContacts,
    getContactById,
    deleteContact
} from "@/api/contact.api";

/**
 * CREAR NUEVO CONTACTO
 */
export const create = async (contactData) => {
    const data = await createContact(contactData);
    return data;
};

/**
 * OBTENER TODOS LOS CONTACTOS
 */
export const getAll = async () => {
    const data = await getAllContacts();
    return data;
};

/**
 * OBTENER CONTACTO POR ID
 */
export const getById = async (id) => {
    const data = await getContactById(id);
    return data;
};

/**
 * ELIMINAR CONTACTO
 */
export const remove = async (id) => {
    const data = await deleteContact(id);
    return data;
};