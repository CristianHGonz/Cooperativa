import Styles from "../styles/pasosDos.module.css";
import { useContext } from "react";
import { Context } from "../context/Context";

export const PasoDosContrataciones = () => {
  const { formData, handleFormChange, avanzarPasoDos, errores, setPasoActual } =
    useContext(Context);

  return (
    <div className={Styles.container}>
      <h4 className={Styles.titulo}>Complete el siguiente formulario:</h4>

      <form
        className={Styles.formulario}
        onSubmit={(e) => {
          e.preventDefault();
          avanzarPasoDos();
        }}
      >
        {/* NOMBRE */}
        <div className={Styles.inputGroup}>
          <input
            type="text"
            name="nombre"
            placeholder=" "
            required
            value={formData.nombre}
            onChange={handleFormChange}
          />
          <label>Nombre y Apellido completo</label>
          {errores.nombre && (
            <span className={Styles.error}>{errores.nombre}</span>
          )}
        </div>

        {/* DIRECCION */}
        <div className={Styles.inputGroup}>
          <input
            type="text"
            name="direccion"
            placeholder=" "
            required
            value={formData.direccion}
            onChange={handleFormChange}
          />
          <label>Dirección</label>
          {errores.direccion && (
            <span className={Styles.error}>{errores.direccion}</span>
          )}
        </div>
        <div className={Styles.inputGroup}>
          <input
            type="text"
            name="localidad"
            placeholder=" "
            required
            value={formData.localidad}
            onChange={handleFormChange}
          />
          <label>Localidad</label>
          {errores.localidad && (
            <span className={Styles.error}>{errores.localidad}</span>
          )}
        </div>

        {/* DNI */}
        <div className={Styles.inputGroup}>
          <input
            type="text"
            name="dni"
            placeholder=" "
            required
            value={formData.dni}
            onChange={handleFormChange}
          />
          <label>DNI</label>
          {errores.dni && <span className={Styles.error}>{errores.dni}</span>}
        </div>

        {/* EMAIL */}
        <div className={Styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder=" "
            required
            value={formData.email}
            onChange={handleFormChange}
          />
          <label>Email</label>
          {errores.email && (
            <span className={Styles.error}>{errores.email}</span>
          )}
        </div>

        {/* TELEFONO */}
        <div className={Styles.inputGroup}>
          <input
            type="text"
            name="telefono"
            placeholder=" "
            required
            value={formData.telefono}
            onChange={handleFormChange}
          />
          <label>N° de contacto</label>
          {errores.telefono && (
            <span className={Styles.error}>{errores.telefono}</span>
          )}
        </div>

        {/* FILE
        <div className={Styles.inputFile}>
          <label>Adjunte las fotos solicitadas</label>
          <input type="file" />
        </div> */}

        {/* BOTONES */}
        <div className={Styles.botones}>
          <button type="button" onClick={() => setPasoActual(1)}>
            Volver
          </button>

          <button type="submit">Siguiente</button>
        </div>
      </form>
    </div>
  );
};
