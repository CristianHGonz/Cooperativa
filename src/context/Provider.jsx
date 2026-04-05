import { useState } from "react";
import { Context } from "./Context";
import Swal from "sweetalert2";

export const Provider = ({ children }) => {
  const [pasoActual, setPasoActual] = useState(1);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [datosUnificados, setDatosUnificados] = useState({});
  const [estado, setEstado] = useState(null); // ✅ dentro del componente

  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    localidad: "",
    dni: "",
    email: "",
    telefono: "",
  });

  const [errores, setErrores] = useState({});

  // 👉 manejar inputs
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 👉 VALIDACIONES
  const validarPasoDos = () => {
    let nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!formData.direccion.trim()) {
      nuevosErrores.direccion = "La dirección es obligatoria";
    }
    if (!formData.localidad.trim()) {
      nuevosErrores.localidad = "La localidad es obligatoria";
    }

    if (!/^\d{7,9}$/.test(formData.dni)) {
      nuevosErrores.dni = "DNI inválido";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nuevosErrores.email = "Email inválido";
    }

    if (!/^\d{6,15}$/.test(formData.telefono)) {
      nuevosErrores.telefono = "Teléfono inválido";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  //  PASO 1
  const avanzarPasoUno = () => {
    if (!planSeleccionado) {
      Swal.fire({
        icon: "warning",
        title: "Selecciona un plan para continuar",
      });
      return;
    }

    setPasoActual(2);
  };

  // PASO 2
  const avanzarPasoDos = () => {
    const esValido = validarPasoDos();

    if (!esValido) return;

    const datos = { ...planSeleccionado, ...formData };

    setDatosUnificados(datos);
    setPasoActual(3);
  };
  // PASO 3
  const avanzarPasoTres = (files) => {
    setDatosUnificados((prev) => ({
      ...prev,
      archivos: files, // 👈 guardamos los archivos
    }));

    setPasoActual(4);
  };

  const limpiarDatos = () => {
    setDatosUnificados({});
  };

  return (
    <Context.Provider
      value={{
        pasoActual,
        setPasoActual,
        planSeleccionado,
        setPlanSeleccionado,
        avanzarPasoUno,
        avanzarPasoDos,
        avanzarPasoTres,
        formData,
        handleFormChange,
        errores,
        datosUnificados,
        estado,
        setEstado,
        limpiarDatos,
      }}
    >
      {children}
    </Context.Provider>
  );
};
