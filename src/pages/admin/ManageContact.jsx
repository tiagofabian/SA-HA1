import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { Loader2, Mail, Phone, Trash2, Eye } from "lucide-react";
import { getAll, remove } from "@/services/contact.service";

const ManageContact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    // Cargar contactos
    const loadContacts = async () => {
        setLoading(true);
        try {
            const data = await getAll();
            setContacts(data);
        } catch (error) {
            console.error("Error al cargar contactos:", error);
            toast.error("Error al cargar mensajes de contacto");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    // Eliminar contacto
    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este mensaje?")) return;

        setDeletingId(id);
        try {
            await remove(id);
            toast.success("Mensaje eliminado correctamente");
            loadContacts(); // Recargar lista
        } catch (error) {
            console.error("Error al eliminar:", error);
            toast.error(error.message || "Error al eliminar mensaje");
        } finally {
            setDeletingId(null);
        }
    };

    // Formatear fecha (si tu backend devuelve fecha de creación)
    const formatDate = (dateString) => {
        if (!dateString) return "No disponible";
        return new Date(dateString).toLocaleDateString("es-CL");
    };

    return (
        <div className="lg:px-16 px-8 py-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Contactos</h1>
                <p className="text-gray-600 mt-2">
                    Administra los mensajes recibidos a través del formulario de contacto
                </p>
            </div>

            <Card className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Mensajes de Contacto</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="ml-2 text-gray-600">Cargando mensajes...</span>
                        </div>
                    ) : contacts.length === 0 ? (
                        <div className="text-center py-12">
                            <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-700">No hay mensajes</h3>
                            <p className="text-gray-500 mt-1">No se han recibido mensajes de contacto aún.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Teléfono</TableHead>
                                        <TableHead>Mensaje</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contacts.map((contact) => (
                                        <TableRow key={contact.id}>
                                            <TableCell className="font-medium">{contact.name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                                    {contact.email}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {contact.phone ? (
                                                    <div className="flex items-center">
                                                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                                        {contact.phone}
                                                    </div>
                                                ) : (
                                                    <Badge variant="outline" className="text-xs">
                                                        No proporcionado
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <div className="truncate" title={contact.message}>
                                                    {contact.message.length > 50
                                                        ? `${contact.message.substring(0, 50)}...`
                                                        : contact.message}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            // Aquí podrías abrir un modal para ver el mensaje completo
                                                            alert(`Mensaje completo:\n\n${contact.message}`);
                                                        }}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDelete(contact.id)}
                                                        disabled={deletingId === contact.id}
                                                    >
                                                        {deletingId === contact.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageContact;