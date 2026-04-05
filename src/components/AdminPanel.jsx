import { useState } from "react";
import { AdminServicios } from "./AdminServicios";
import { AdminContrataciones } from "./AdminContrataciones";
import { AdminReferencias } from "./AdminReferencias";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

import styles from "../styles/AdminPanel.module.css";

export const AdminPanel = () => {
  const [vista, setVista] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // vuelve al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* RIGHT PANEL */}
      <div className={styles.right}>
        {!vista ? (
          <>
            <h2 className={styles.title}>Panel Administrador</h2>
            <button className={styles.logout} onClick={handleLogout}>
              🔒 Cerrar sesión
            </button>
            <div className={styles.menu}>
              <button
                className={styles.button}
                onClick={() => setVista("servicios")}
              >
                💰 Modificar precios
              </button>

              <button
                className={styles.button}
                onClick={() => setVista("contrataciones")}
              >
                📄 Ver altas
              </button>

              <button
                className={styles.button}
                onClick={() => setVista("referencias")}
              >
                📡 Gestionar Referencias
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.content}>
              {vista === "servicios" && <AdminServicios />}
              {vista === "contrataciones" && <AdminContrataciones />}
              {vista === "referencias" && <AdminReferencias />}
            </div>
          </>
        )}
        <button className={styles.back} onClick={() => setVista(null)}>
          ← Volver
        </button>
      </div>
    </div>
  );
};
