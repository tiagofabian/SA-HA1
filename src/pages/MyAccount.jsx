import React, { useEffect, useState } from "react";

import { fetchCustomerByEmail } from "@/services/customer.service";
import { fetchAddressByIdCustomer } from "@/services/address.service";
import { useAuth } from "@/context/AuthContext";

const MyAccount = () => {
  const [customer, setCustomer] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Obtener datos del cliente
        const customerData = await fetchCustomerByEmail(user.email);
        setCustomer(customerData);

        // Obtener dirección asociada al id del cliente
        const addressData = await fetchAddressByIdCustomer(customerData.id);
        setAddress(addressData || null);

      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los datos de tu cuenta");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        Cargando datos de tu cuenta...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-md border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Mi Cuenta</h1>

      <div className="space-y-4">
        {/* Datos del cliente */}
        <div>
          <span className="font-semibold">Nombre:</span> {customer?.nombre || ""}
        </div>
        <div>
          <span className="font-semibold">Correo:</span> {customer?.correo || ""}
        </div>
        <div>
          <span className="font-semibold">Teléfono:</span> {customer?.telefono || ""}
        </div>

        <hr className="my-4" />

        {/* Dirección */}
        <div>
          <span className="font-semibold">Dirección:</span> {address?.address || ""}
        </div>
        <div>
          <span className="font-semibold">Ciudad:</span> {address?.city || ""}
        </div>
        <div>
          <span className="font-semibold">Región:</span> {address?.region || ""}
        </div>
        <div>
          <span className="font-semibold">Código Postal:</span>{" "}
          {address?.zip_code != null ? address.zip_code : ""}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
