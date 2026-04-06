import styles from "../styles/PasosTres.module.css";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../context/Context";

export const PasoTresContrataciones = () => {
  const { avanzarPasoTres, setPasoActual } = useContext(Context);
  const [files, setFiles] = useState({
    dni: null,
    comprobante: null,
  });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];

    if (!file) return;

    // 👉 Validar tipo
    const tiposPermitidos = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!tiposPermitidos.includes(file.type)) {
      alert("Solo se permiten imágenes (JPG, PNG) o PDF");
      return;
    }

    // 👉 Validar tamaño (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes

    if (file.size > maxSize) {
      alert("El archivo no puede superar los 5MB");
      return;
    }

    // 👉 Guardar archivo
    setFiles((prev) => ({ ...prev, [type]: file }));
  };

  const uploadedCount = Object.values(files).filter(Boolean).length;

  return (
    <div className={styles.container}>
      <h2>Subí tu documentación</h2>
      <p className={styles.subtitle}>
        Necesitamos estos archivos para validar tus datos.
      </p>

      <div className={styles.uploadGroup}>
        {/* DNI */}
        <label
          className={`${styles.uploadCard} ${files.dni ? styles.uploaded : ""}`}
        >
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "dni")}
            hidden
          />
          <div className={styles.uploadContent}>
            <span className={styles.icon}>📄</span>
            <p className={styles.title}>DNI</p>
            <p className={styles.text}>
              {files.dni ? files.dni.name : "Arrastrá o hacé click para subir"}
            </p>
          </div>
        </label>

        {/* Comprobante */}
        <label
          className={`${styles.uploadCard} ${
            files.comprobante ? styles.uploaded : ""
          }`}
        >
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "comprobante")}
            hidden
          />
          <div className={styles.uploadContent}>
            <span className={styles.icon}>🏠</span>
            <p className={styles.title}>Comprobante de domicilio</p>
            <p className={styles.text}>
              {files.comprobante
                ? files.comprobante.name
                : "Arrastrá o hacé click para subir"}
            </p>
          </div>
        </label>
      </div>

      <p className={styles.progress}>{uploadedCount} de 2 archivos cargados</p>

      <p className={styles.security}>
        Tus archivos son confidenciales y se usan solo para completar su legajo.
      </p>

      <div className={styles.buttons}>
        <button
          className={`${styles.btn} ${styles.back}`}
          onClick={() => setPasoActual(2)}
        >
          Volver
        </button>
        <button
          className={`${styles.btn} ${styles.next}`}
          onClick={() => avanzarPasoTres(files)}
          disabled={uploadedCount < 2}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
