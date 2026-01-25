import React, { useEffect, useState } from "react";
import { fetchCustomerByEmail } from "@/services/customer.service";
import { fetchAddressByIdCustomer, editAddress, saveAddress as saveAddressService } from "@/services/address.service";
import { update } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const MyAccount = () => {
  const [customer, setCustomer] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  const { user } = useAuth();

  const [customerForm, setCustomerForm] = useState({ name: "", phone: "" });
  const [addressForm, setAddressForm] = useState({ address: "", city: "", region: "", zip_code: "" });

  useEffect(() => {
  if (!user?.email) return;

  const fetchData = async () => {
    setLoading(true);
    try {
      const customerData = await fetchCustomerByEmail(user.email);
      console.log("📥 Cliente cargado:", customerData);
      setCustomer(customerData);
      setCustomerForm({ 
        name: customerData.nombre || customerData.name || "", 
        phone: customerData.phone || "" 
      });

      if (customerData.id) {
        console.log("🔍 Buscando dirección para cliente ID:", customerData.id);
        try {
          const addressData = await fetchAddressByIdCustomer(customerData.id);
          console.log("📥 Dirección cargada:", addressData);
          setAddress(addressData);
          setAddressForm({
            address: addressData?.address || "",
            city: addressData?.city || "",
            region: addressData?.region || "",
            zip_code: addressData?.zip_code || "",
          });
        } catch (addrErr) {
          console.log("ℹ️ No se encontró dirección:", addrErr.message);
          setAddress(null);
        }
      }
    } catch (err) {
      console.error("Error al cargar datos:", err);
      toast.error("No se pudieron cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [user]);

  const handleCustomerChange = (e) => setCustomerForm({ ...customerForm, [e.target.name]: e.target.value });
  const handleAddressChange = (e) => setAddressForm({ ...addressForm, [e.target.name]: e.target.value });

  const saveCustomer = async () => {
    try {
      const userData = {
        name: customerForm.name,
        email: null, // No cambiar email
        phone: customerForm.phone,
        rol: "USUARIO",
        active: true
      };

      console.log("Actualizando usuario:", userData);
      const updated = await update(customer.id, userData);

      setCustomer({
        ...customer,
        nombre: updated.name || updated.nombre,
        email: updated.email,
        phone: updated.phone
      });

      setEditingCustomer(false);
      toast.success("Datos actualizados correctamente");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Error al actualizar datos");
    }
  };

  const saveAddress = async () => {
    try {
      console.log("=== DEBUG DIRECCIÓN ===");
      console.log("1. Estado address:", address);
      console.log("2. address.id_address:", address?.id_address);
      console.log("3. Formulario addressForm:", addressForm);
      console.log("4. Customer ID:", customer?.id);

      let updated;

      if (address?.id_address) {
        console.log("🔄 MODE: Actualizando dirección existente");
        console.log("ID dirección a actualizar:", address.id_address);
        console.log("Datos a enviar:", {
          address: addressForm.address || null,
          city: addressForm.city || null,
          region: addressForm.region || null,
          zip_code: addressForm.zip_code || null,
          id_customer: customer.id
        });

        updated = await editAddress(address.id_address, {
          address: addressForm.address || null,
          city: addressForm.city || null,
          region: addressForm.region || null,
          zip_code: addressForm.zip_code || null,
          id_customer: customer.id
        });
      } else {
        console.log("🆕 MODE: Creando nueva dirección");
        console.log("Datos a enviar:", {
          address: addressForm.address || null,
          city: addressForm.city || null,
          region: addressForm.region || null,
          zip_code: addressForm.zip_code || null,
          id_customer: customer.id
        });

        updated = await saveAddressService({
          address: addressForm.address || null,
          city: addressForm.city || null,
          region: addressForm.region || null,
          zip_code: addressForm.zip_code || null,
          id_customer: customer.id
        });
      }

      console.log("✅ RESPUESTA del backend:", updated);
      setAddress(updated);
      setEditingAddress(false);
      toast.success("Dirección guardada correctamente");

    } catch (err) {
      console.error("❌ ERROR completo:", err);
      console.error("❌ Error message:", err.message);
      console.error("❌ Error stack:", err.stack);
      toast.error(err.message || "Error al guardar dirección");
    }
  };

  if (loading) return <div className="text-center py-12">Cargando...</div>;

  return (
    <div className="container mx-auto px-4 py-8 my-8 w-full md:w-[70%] lg:w-[50%] border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Mi Cuenta</h1>

      {/* Datos Personales */}
      <div className="space-y-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="font-semibold text-lg">Datos Personales</h2>

        {editingCustomer ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Nombre</label>
              <input name="name" value={customerForm.name} onChange={handleCustomerChange}
                className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input value={customer?.email || ""} disabled
                className="w-full border px-3 py-2 rounded bg-gray-100" />
              <p className="text-xs text-gray-500 mt-1">El email no se puede modificar</p>
            </div>
            <div>
              <label className="block text-sm mb-1">Teléfono</label>
              <input name="phone" value={customerForm.phone} onChange={handleCustomerChange}
                className="w-full border px-3 py-2 rounded" />
            </div>
            <div className="flex gap-2">
              <button onClick={saveCustomer} className="bg-green-500 text-white px-4 py-2 rounded flex-1">
                Guardar
              </button>
              <button onClick={() => setEditingCustomer(false)} className="bg-gray-300 px-4 py-2 rounded flex-1">
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div><span className="font-semibold">Nombre:</span> {customer?.nombre || customer?.name || "Sin rellenar"}</div>
            <div><span className="font-semibold">Email:</span> {customer?.email || "Sin rellenar"}</div>
            <div><span className="font-semibold">Teléfono:</span> {customer?.phone || "Sin rellenar"}</div>
            <button onClick={() => setEditingCustomer(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Editar
            </button>
          </>
        )}
      </div>

      <div className="border-t my-6"></div>

      {/* Dirección */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h2 className="font-semibold text-lg">Dirección</h2>

        {!address && !editingAddress ? (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">No tienes dirección registrada</p>
            <button onClick={() => setEditingAddress(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Agregar dirección
            </button>
          </div>
        ) : editingAddress ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Dirección</label>
              <input name="address" value={addressForm.address} onChange={handleAddressChange}
                className="w-full border px-3 py-2 rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Ciudad</label>
                <input name="city" value={addressForm.city} onChange={handleAddressChange}
                  className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block text-sm mb-1">Región</label>
                <input name="region" value={addressForm.region} onChange={handleAddressChange}
                  className="w-full border px-3 py-2 rounded" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Código Postal</label>
              <input name="zip_code" value={addressForm.zip_code} onChange={handleAddressChange}
                className="w-full border px-3 py-2 rounded" />
            </div>
            <div className="flex gap-2">
              <button onClick={saveAddress} className="bg-green-500 text-white px-4 py-2 rounded flex-1">
                Guardar
              </button>
              <button onClick={() => setEditingAddress(false)} className="bg-gray-300 px-4 py-2 rounded flex-1">
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div><span className="font-semibold">Dirección:</span> {address?.address || "Sin rellenar"}</div>
            <div><span className="font-semibold">Ciudad:</span> {address?.city || "Sin rellenar"}</div>
            <div><span className="font-semibold">Región:</span> {address?.region || "Sin rellenar"}</div>
            <div><span className="font-semibold">Código Postal:</span> {address?.zip_code || "Sin rellenar"}</div>
            <button onClick={() => setEditingAddress(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Editar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyAccount;