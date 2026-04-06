import { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import { obtenerReferencias } from "../firebase/db";
import styles from "../styles/PasosCuatro.module.css";
import { guardarContratacion } from "../firebase/db";
import { subirArchivo } from "../firebase/storage";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
// import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const PasoCuatroContrataciones = ({ precio, setPasoActual }) => {
  const { datosUnificados, limpiarDatos } = useContext(Context);

  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputRef, setInputRef] = useState("");
  const [referencias, setReferencias] = useState([]);
  const [valor, setValor] = useState(null);
  const [error, setError] = useState("");
  // const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarReferencias = async () => {
      const data = await obtenerReferencias();

      setReferencias(data);
    };

    cargarReferencias();
  }, []);

  const validarReferencia = () => {
    setError("");
    setValor(null);

    const refLimpia = inputRef.trim().toUpperCase();

    if (!refLimpia) {
      setError("Ingresá una referencia");
      return;
    }

    const refEncontrada = referencias.find(
      (r) => r.codigo && r.codigo.toUpperCase() === refLimpia && !r.usado,
    );

    if (refEncontrada) {
      setValor(refEncontrada.importe);
    } else {
      setError("Referencia inválida");
    }
  };

  const handleConfirmar = async () => {
    if (loading) return;
    const uid = Date.now().toString();

    if (!aceptaTerminos) {
      Swal.fire({
        icon: "warning",
        title: "Tienes que aceptar los términos y condiciones para continuar",
      });
      return;
    }

    if (valor === null) {
      Swal.fire({
        icon: "warning",
        title: "Ingresa una referencia válida para continuar",
      });
      return;
    }

    try {
      setLoading(true);

      // 📎 archivos
      const dniFile = datosUnificados.archivos?.dni;
      const compFile = datosUnificados.archivos?.comprobante;

      const dniData = await subirArchivo(dniFile, uid, "dni");
      const compData = await subirArchivo(compFile, uid, "comp");

      const { archivos: _archivos, ...restoDatos } = datosUnificados;

      const dataFinal = {
        ...restoDatos,

        dniArchivoUrl: dniData.url,
        comprobanteUrl: compData.url,

        dniPath: dniData.path, // 🔥 CLAVE
        compPath: compData.path, // 🔥 CLAVE

        referencia: inputRef,
        instalacionFinal: valor,
        fecha: new Date(),
      };

      await guardarContratacion(dataFinal);

      await emailjs.send(
        "service_1nlz5fr",
        "template_aj4n5tq",
        {
          nombre: datosUnificados.nombre,
          servicio: datosUnificados.Servicio,
          dni: datosUnificados.dni,
          Contacto: datosUnificados.contacto,
          velocidad: datosUnificados.Velocidad,
          precio: datosUnificados.Precio,
          instalacion: valor,
          plan: datosUnificados.Velocidad,
          direccion: datosUnificados.direccion,
          email: datosUnificados.email,
        },
        "wqEdh5RG5cOzQ_tft",
      );

      Swal.fire({
        icon: "success",
        title: "Contratacion Exitosa",
        text: "Recibiras un email con los detalles e instrucciones para la instalación",
        confirmButtonColor: "#2c7be5",
      });
      limpiarDatos();
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error al guardar la contratación");
    } finally {
      setLoading(false);
    }
  };

  if (!datosUnificados || Object.keys(datosUnificados).length === 0) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className={styles.containerGrid}>
      {/* 🟦 IZQUIERDA */}
      <div className={styles.colIzquierda}>
        {/* DATOS PERSONALES */}
        <div className={styles.card}>
          <div className={styles.header}>
            <h3>Datos personales</h3>
            <button onClick={() => setPasoActual(2)}>Editar</button>
          </div>
          <p className={styles.textServicio}>
            Nombre: {datosUnificados?.nombre}
          </p>
          <p className={styles.textServicio}>DNI: {datosUnificados?.dni}</p>
          <p className={styles.textServicio}>Email: {datosUnificados?.email}</p>
        </div>

        {/* SERVICIO */}
        <div className={styles.card}>
          <div className={styles.header}>
            <h3>Servicio</h3>
            <button onClick={() => setPasoActual(1)}>Editar</button>
          </div>
          <p className={styles.textServicio}>
            Plan: {datosUnificados?.Servicio}
          </p>
          <p className={styles.textServicio}>
            Velocidad: {datosUnificados?.Velocidad}
          </p>
        </div>

        {/* DIRECCION */}
        <div className={styles.card}>
          <div className={styles.header}>
            <h3>Dirección</h3>
            <button onClick={() => setPasoActual(2)}>Editar</button>
          </div>
          <p className={styles.textServicio}>{datosUnificados?.direccion}</p>
          <p className={styles.textServicio}>{datosUnificados?.localidad}</p>
        </div>

        {/* REFERENCIA */}
        <div className={styles.card}>
          <h3>Referencia</h3>

          <input
            className={styles.inputRef}
            type="text"
            value={inputRef}
            onChange={(e) => {
              setInputRef(e.target.value);
              setError("");
              setValor(null); // 🔥 limpia resultado anterior
            }}
          />

          <button className={styles.botonValidar} onClick={validarReferencia}>
            Validar
          </button>

          {error && <p className={styles.error}>{error}</p>}
          {valor !== null && (
            <p className={styles.ok}>✔ Instalación: ${valor}</p>
          )}
        </div>
      </div>

      {/* 🟩 DERECHA */}
      <div className={styles.colDerecha}>
        {/* ABONO */}
        <div className={styles.cardResumen}>
          <h3>Abono mensual</h3>
          <p className={styles.precio}>${datosUnificados?.Precio}</p>
          <p className={styles.leyenda}>más $6.000 gastos varios</p>
        </div>

        {/* INSTALACION */}
        <div className={styles.cardResumen}>
          <h3 className={styles.textServicio}>Pago inicial</h3>
          <p className={styles.textServicio}>
            Instalación: ${valor ?? datosUnificados?.instalacion}
          </p>

          <hr />

          <p className={styles.total}>
            Total hoy: ${valor ?? precio?.instalacion}
          </p>

          <div className={styles.confirmacionBox}>
            <div className={styles.terminos}>
              <input
                id="terminos"
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
              />
              <label>Acepto términos y condiciones</label>
            </div>

            <button
              className={styles.botonConfirmar}
              onClick={handleConfirmar}
              disabled={!aceptaTerminos || valor === null || loading}
            >
              {loading ? "Procesando..." : "Confirmar contratación"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
