import React, { useEffect, useState } from "react";

import { fetchCustomerByEmail, editCustomer } from "@/services/customer.service";
import { fetchAddressByIdCustomer, editAddress } from "@/services/address.service";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const MyAccount = () => {
  const [customer, setCustomer] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingCustomer, setEditingCustomer] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  const [customerForm, setCustomerForm] = useState({});
  const [addressForm, setAddressForm] = useState({});

  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const customerData = await fetchCustomerByEmail(user.email);
        setCustomer(customerData);
        setCustomerForm({
          nombre: customerData.nombre,
          correo: customerData.correo,
          telefono: customerData.telefono,
        });

        if (customerData.id) {
          const addressData = await fetchAddressByIdCustomer(customerData.id);
          setAddress(addressData);
          console.log("aquiiiiiiii".addressData)
          setAddressForm({
            address: addressData?.address || "",
            city: addressData?.city || "",
            region: addressData?.region || "",
            zip_code: addressData?.zip_code || "",
          });
        } else {
          setAddress(null);
        }
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los datos de tu cuenta");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Manejo de inputs
  const handleCustomerChange = (e) =>
    setCustomerForm({ ...customerForm, [e.target.name]: e.target.value });
  const handleAddressChange = (e) =>
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });

  // Guardar cambios
  const saveCustomer = async () => {
    try {
      const updated = await editCustomer(customer.id, customerForm);
      setCustomer(updated);
      setEditingCustomer(false);
      toast.success("Datos del cliente actualizados");
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar cliente");
    }
  };

  const saveAddress = async () => {
    try {
      const updated = await editAddress(address.id_address, {
        ...addressForm,
        id_customer: customer.id,
      });
      setAddress(updated);
      setEditingAddress(false);
      toast.success("Dirección actualizada");
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar dirección");
    }
  };

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
    <div className="container mx-auto px-6 py-12 my-20 w-[50%] border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Mi Cuenta</h1>

      {/* CLIENTE */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Datos del cliente</h2>
        {editingCustomer ? (
          <div className="space-y-2">
            <input
              name="nombre"
              value={customerForm.nombre}
              onChange={handleCustomerChange}
              className="w-full border px-2 py-1 rounded"
            />
            <input
              name="correo"
              value={customerForm.correo}
              onChange={handleCustomerChange}
              className="w-full border px-2 py-1 rounded"
            />
            <input
              name="telefono"
              value={customerForm.telefono}
              onChange={handleCustomerChange}
              className="w-full border px-2 py-1 rounded"
            />
            <button
              className="bg-green-500 text-white px-4 py-1 rounded mr-2"
              onClick={saveCustomer}
            >
              Guardar
            </button>
            <button
              className="bg-gray-300 px-4 py-1 rounded"
              onClick={() => setEditingCustomer(false)}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <>
            <div><span className="font-semibold">Nombre:</span> {customer.nombre}</div>
            <div><span className="font-semibold">Correo:</span> {customer.correo}</div>
            <div><span className="font-semibold">Teléfono:</span> {customer.telefono}</div>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
              onClick={() => setEditingCustomer(true)}
            >
              Editar
            </button>
          </>
        )}
      </div>

      <hr className="my-4" />

      {/* DIRECCIÓN */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Dirección</h2>
        {editingAddress ? (
          <div className="space-y-2">
            <input
              name="address"
              value={addressForm.address}
              onChange={handleAddressChange}
              className="w-full border px-2 py-1 rounded"
            />
            <input
              name="city"
              value={addressForm.city}
              onChange={handleAddressChange}
              className="w-full border px-2 py-1 rounded"
            />
            <input
              name="region"
              value={addressForm.region}
              onChange={handleAddressChange}
              className="w-full border px-2 py-1 rounded"
            />
            <input
              name="zip_code"
              value={addressForm.zip_code}
              onChange={handleAddressChange}
              className="w-full border px-2 py-1 rounded"
            />
            <button
              className="bg-green-500 text-white px-4 py-1 rounded mr-2"
              onClick={saveAddress}
            >
              Guardar
            </button>
            <button
              className="bg-gray-300 px-4 py-1 rounded"
              onClick={() => setEditingAddress(false)}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <>
            <div><span className="font-semibold">Dirección:</span> {address?.address}</div>
            <div><span className="font-semibold">Ciudad:</span> {address?.city}</div>
            <div><span className="font-semibold">Región:</span> {address?.region}</div>
            <div><span className="font-semibold">Código Postal:</span> {address?.zip_code}</div>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
              onClick={() => setEditingAddress(true)}
            >
              Editar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
