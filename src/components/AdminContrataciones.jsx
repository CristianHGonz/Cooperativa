import { useEffect, useState } from "react";
import {
  obtenerContrataciones,
  eliminarContratacionCompleta,
} from "../firebase/db";

import styles from "../styles/admin.module.css";

export const AdminContrataciones = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await obtenerContrataciones();

      // 🔥 eliminar duplicados por ID
      const unique = Array.from(
        new Map(res.map((item) => [item.id, item])).values(),
      );

      setData(unique);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filtrados = data.filter((item) =>
    item.nombre?.toLowerCase().includes(busqueda.toLowerCase()),
  );

  if (loading) return <p className={styles.loading}>Cargando...</p>;
  const handleEliminar = async (contratacion) => {
    try {
      console.log("🧨 Eliminando objeto completo:", contratacion);
      console.log("🔥 ID que intento borrar:", contratacion.id);

      await eliminarContratacionCompleta(contratacion);

      console.log("✅ Eliminado de Firebase");

      setData((prev) => prev.filter((item) => item.id !== contratacion.id));
    } catch (error) {
      console.error("❌ Error al eliminar:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Panel de contrataciones</h2>

      <input
        className={styles.input}
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* DESKTOP TABLE */}
      <div className={styles.cards}>
        {filtrados.map((item) => (
          <div key={`${item.id}`} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{item.nombre}</h3>
              <span className={styles.badge}>{item.Servicio}</span>
            </div>

            <p>
              <b>DNI:</b> {item.dni}
            </p>
            <p>
              <b>Plan:</b> {item.Velocidad}
            </p>
            <p>
              <b>Email:</b> {item.email}
            </p>
            <p>
              <b>Instalación:</b> ${item.instalacionFinal}
            </p>

            <p>
              <b>Fecha:</b>{" "}
              {item.fecha
                ? new Date(item.fecha.seconds * 1000).toLocaleDateString()
                : "-"}
            </p>

            <div className={styles.links}>
              <a href={item.dniArchivoUrl} target="_blank">
                📄 DNI
              </a>
              <a href={item.comprobanteUrl} target="_blank">
                🧾 Comp.
              </a>

              <button onClick={() => handleEliminar(item)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
