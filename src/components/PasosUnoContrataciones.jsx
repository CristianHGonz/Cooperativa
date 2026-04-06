import { Context } from "../context/Context";
import { obtenerPlanes } from "../firebase/db";
import { useState, useEffect, useContext } from "react";
import Styles from "../styles/PasosUno.module.css";
import { Loaders } from "../components/Loaders";

export const PasoUnoContrataciones = () => {
  const [planesFTTH, setPlanesFTTH] = useState([]);
  const [planesWSS, setPlanesWSS] = useState([]);
  const [loadingFTTH, setLoadingFTTH] = useState(true);
  const [loadingWSS, setLoadingWSS] = useState(true);

  const { planSeleccionado, setPlanSeleccionado, avanzarPasoUno } =
    useContext(Context);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const ftth = await obtenerPlanes("FTTH");
        const wss = await obtenerPlanes("WSS");

        setTimeout(() => {
          setPlanesFTTH(ftth);
          setLoadingFTTH(false); // 👈 solo FTTH

          setPlanesWSS(wss);
          setLoadingWSS(false); // 👈 solo WSS
        }, 3000);
      } catch (error) {
        console.error("Error cargando planes:", error);
      }
    };

    fetchPlanes();
  }, []);

  return (
    <>
      <div className={Styles.destacado}>
        <h3 className={Styles.titulo}>
          Documentación que debe tener para solicitar servicio:
        </h3>

        <ul className={Styles.ulRequisitos}>
          <li>Foto de DNI (ambos lados)</li>
          <li>
            Foto de Escritura o boleto Compra-Venta ó Contrato del Alquiler
          </li>
          <li>Número de referencia de verificación</li>
        </ul>
      </div>

      <h3 className={Styles.subTitulo}>
        Seleccione el Servicio que desea contratar:
      </h3>

      <div className={Styles.divTabla}>
        <h4 className={Styles.ftth}>PLANES DE FIBRA ÓPTICA</h4>

        <table className={Styles.tabla}>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Velocidad</th>
              <th>Precio*</th>
              <th>Seleccionar</th>
            </tr>
          </thead>

          <tbody>
            {loadingFTTH ? (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <Loaders />
                </td>
              </tr>
            ) : (
              planesFTTH.map((plan) => (
                <tr
                  key={plan.id}
                  onClick={() => setPlanSeleccionado(plan)}
                  className={
                    planSeleccionado?.id === plan.id ? Styles.planActivo : ""
                  }
                >
                  <td>{plan.Servicio}</td>
                  <td>{plan.Velocidad}</td>
                  <td>${plan.Precio}</td>

                  <td>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlanSeleccionado(plan);
                      }}
                      className={`${Styles.boton2} ${
                        planSeleccionado?.id === plan.id
                          ? Styles.boton2Activo
                          : ""
                      }`}
                    >
                      {planSeleccionado?.id === plan.id ? "✔" : "+"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h4 className={Styles.wss}>PLANES DE WIRELESS</h4>

        <table className={Styles.tabla}>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Velocidad</th>
              <th>Precio*</th>
              <th>Seleccionar</th>
            </tr>
          </thead>

          <tbody>
            {loadingWSS ? (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <Loaders />
                </td>
              </tr>
            ) : (
              planesWSS.map((plan) => (
                <tr
                  key={plan.id}
                  onClick={() => setPlanSeleccionado(plan)}
                  className={
                    planSeleccionado?.id === plan.id ? Styles.planActivo : ""
                  }
                >
                  <td>{plan.Servicio}</td>
                  <td>{plan.Velocidad}</td>
                  <td>${plan.Precio}</td>

                  <td>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlanSeleccionado(plan);
                      }}
                      className={`${Styles.boton2} ${
                        planSeleccionado?.id === plan.id
                          ? Styles.boton2Activo
                          : ""
                      }`}
                    >
                      {planSeleccionado?.id === plan.id ? "✔" : "+"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <p className={Styles.gastos}>* más gastos $6000 aprox.</p>

        <button onClick={avanzarPasoUno} className={Styles.boton}>
          Siguiente
        </button>
      </div>
    </>
  );
};
