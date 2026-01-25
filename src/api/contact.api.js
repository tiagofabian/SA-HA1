import { API_URL } from "../config/env";

// POST: Crear nuevo mensaje de contacto
export const createContact = async (contactData) => {
    if (!contactData.name || !contactData.email || !contactData.message) {
        throw new Error("Nombre, email y mensaje son obligatorios");
    }

    const response = await fetch(`${API_URL}/api/contact/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al enviar mensaje");
    }

    return response.json();
};

// GET: Obtener todos los contactos (para admin)
export const getAllContacts = async () => {
    const response = await fetch(`${API_URL}/api/contact`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        throw new Error("Error al obtener contactos");
    }

    return response.json();
};

// GET: Obtener contacto por ID
export const getContactById = async (id) => {
    const response = await fetch(`${API_URL}/api/contact/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        throw new Error("Error al obtener contacto");
    }

    return response.json();
};

// DELETE: Eliminar contacto
export const deleteContact = async (id) => {
    const response = await fetch(`${API_URL}/api/contact/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al eliminar contacto");
    }

    return true; // Confirmación de eliminación
};