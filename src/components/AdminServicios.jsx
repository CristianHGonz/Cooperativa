import { useEffect, useState } from "react";
import { obtenerServicios, actualizarServicio } from "../firebase/db";
import styles from "../styles/AdminServicios.module.css";

export const AdminServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    precio: "",
    velocidad: "",
    descripcion: "",
  });
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    const res = await obtenerServicios();

    const unicos = Array.from(
      new Map(res.map((item) => [item.id, item])).values(),
    );

    setServicios(unicos);
  };

  const handleEditar = (servicio) => {
    setEditandoId(servicio.id);

    setForm({
      precio: servicio.Precio ?? "",
      velocidad: servicio.Velocidad ?? "",
      descripcion: servicio.Servicio ?? "",
    });
  };

  const validar = () => {
    if (!form.precio || isNaN(form.precio)) return false;
    if (!form.velocidad) return false;
    return true;
  };

  const handleGuardar = async () => {
    if (!validar()) return;

    try {
      setGuardando(true);

      await actualizarServicio(editandoId, {
        Precio: Number(form.precio),
        Velocidad: form.velocidad ?? "",
        Servicio: form.descripcion ?? "",
      });

      setEditandoId(null);
      await cargarServicios();
    } catch (error) {
      console.error(error);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Editar Servicios</h2>

      <div className={styles.tableWrapper}>
        <div className={styles.grid}>
          {servicios.map((s) => (
            <div key={s.id} className={styles.card}>
              <div className={styles.row}>
                <span>Precio</span>
                {editandoId === s.id ? (
                  <input
                    value={form.precio}
                    onChange={(e) =>
                      setForm({ ...form, precio: e.target.value })
                    }
                  />
                ) : (
                  <strong>${s.Precio}</strong>
                )}
              </div>

              <div className={styles.row}>
                <span>Velocidad</span>
                {editandoId === s.id ? (
                  <input
                    value={form.velocidad}
                    onChange={(e) =>
                      setForm({ ...form, velocidad: e.target.value })
                    }
                  />
                ) : (
                  <strong>{s.Velocidad}</strong>
                )}
              </div>

              <div className={styles.row}>
                <span>Descripción</span>
                {editandoId === s.id ? (
                  <input
                    value={form.descripcion}
                    onChange={(e) =>
                      setForm({ ...form, descripcion: e.target.value })
                    }
                  />
                ) : (
                  <strong>{s.Servicio}</strong>
                )}
              </div>

              <div className={styles.actions}>
                {editandoId === s.id ? (
                  <button onClick={handleGuardar} disabled={guardando}>
                    {guardando ? "Guardando..." : "Guardar"}
                  </button>
                ) : (
                  <button onClick={() => handleEditar(s)}>Editar</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
