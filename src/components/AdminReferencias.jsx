import styles from "../styles/AdminReferencias.module.css";
import { useEffect, useState } from "react";

import {
  obtenerReferencias,
  crearReferenciaManual,
  eliminarReferencia,
} from "../firebase/db";

export const AdminReferencias = () => {
  const [referencias, setReferencias] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [importe, setImporte] = useState("");

  const cargarReferencias = async () => {
    const data = await obtenerReferencias();
    setReferencias(data);
  };

  useEffect(() => {
    cargarReferencias();
  }, []);

  const handleCrear = async () => {
    if (!codigo.trim() || !importe) {
      alert("Completa todos los campos");
      return;
    }

    await crearReferenciaManual(codigo, Number(importe));
    setCodigo("");
    setImporte("");
    cargarReferencias();
  };

  const handleEliminar = async (id) => {
    await eliminarReferencia(id);
    cargarReferencias();
  };

  const handleEditar = async (id) => {
    const nuevoImporte = prompt("Nuevo importe:");
    if (!nuevoImporte) return;

    await actualizarReferencia(id, {
      importe: Number(nuevoImporte),
    });

    cargarReferencias();
  };

  return (
    <div className={styles.container}>
      <h2>Referencias</h2>

      <div className={styles.form}>
        <input
          placeholder="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <input
          placeholder="Importe"
          type="number"
          value={importe}
          onChange={(e) => setImporte(e.target.value)}
        />

        <button onClick={handleCrear}>Crear</button>
      </div>

      <div className={styles.list}>
        {referencias.map((ref) => (
          <div className={styles.card} key={ref.id}>
            <div className={styles.info}>
              {ref.codigo} - ${ref.importe}
            </div>

            <div className={styles.actions}>
              <button
                className={styles.editBtn}
                onClick={() => handleEditar(ref.id)}
              >
                Editar
              </button>

              <button
                className={styles.deleteBtn}
                onClick={() => handleEliminar(ref.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
