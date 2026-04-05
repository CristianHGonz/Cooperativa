import { useState, useEffect } from "react";
import styles from "../styles/Servicios.module.css";
import { obtenerPlanes } from "../firebase/db";
import { Link } from "react-router-dom";
import { Loaders } from "../components/Loaders";

export const Servicios = () => {
  const [planesFTTH, setPlanesFTTH] = useState([]);
  const [planesWSS, setPlanesWSS] = useState([]);
  const [loadingFTTH, setLoadingFTTH] = useState(true);
  const [loadingWSS, setLoadingWSS] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      obtenerPlanes("FTTH")
        .then((data) => setPlanesFTTH(data))
        .finally(() => setLoadingFTTH(false));

      obtenerPlanes("WSS")
        .then((data) => setPlanesWSS(data))
        .finally(() => setLoadingWSS(false));
    }, 4000);
  }, []);

  return (
    <div>
      <h2 className={styles.tituloServicios}>Nuestros Servicios</h2>
      <h3 className={styles.subTituloServicios}>FIBRA OPTICA</h3>
      <p className={styles.frase}>
        Navega sin límites con internet de 300 Megas por fibra óptica: Disfruta
        de la mejor experiencia de internet al hogar con 300 megas de fibra
        óptica. Gracias a su velocidad simétrica (300 Mbps de bajada y subida),
        podés navegar sin interrupciones, jugar online sin lag y hacer
        videollamadas con la mejor definición sin afectar el rendimiento de
        otros dispositivos. Conectá tu smart TV, consola, notebook y celulares
        al mismo tiempo sin cortes, y disfrutá de Wi-Fi en toda tu casa con
        máxima estabilidad.
      </p>
      <div className={styles.sectionFull}>
        <div className={styles.sectionContent}>
          {loadingFTTH ? (
            <div className={styles.loaderContainer}>
              <Loaders />
            </div>
          ) : (
            <div className={styles.cardsContainer}>
              {planesFTTH.map((plan) => (
                <div key={plan.id} className={`${styles.card} ${styles.ftth}`}>
                  <h3 className={styles.cardTitle}>{plan.Servicio}</h3>

                  <p className={styles.price}>${plan.Precio}</p>
                  <span className={styles.month}>por mes</span>

                  <ul className={styles.features}>
                    <li>Descarga {plan.Velocidad}</li>
                    <li>Subida {plan.Subida || "—"}</li>
                    <li>WiFi incluido</li>
                    <li>FTTH - Fibra al hogar</li>
                  </ul>

                  <Link to="/Contacto" className={styles.btn}>
                    Más info
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <h3 className={styles.subTituloServicios}>
        Internet por aire (Wireless)
      </h3>
      <p className={styles.frase}>
        El sistema de internet por aire (wireless) funciona a través de un
        enlace entre dos equipos. El principal, o nodo, desde el cual se
        transmite la señal, y el segundo, instalado en el domicilio del
        solicitante del servicio, el cual recepta la misma para su uso
        doméstico. El internet viaja a través de una banda 5.8 GHz, lo cual
        permite mayor velocidad y menor interferencia aunque su alcance sea más
        corto. Este último inconveniente se compensa con la colocación de varios
        nodos para abarcar la mayor cantidad de territorio posible y así
        permitir el acceso de internet a aquellos lugares donde la tecnología de
        FTTH aún no es posible.
      </p>
      <div className={styles.sectionFull}>
        <div className={styles.sectionContent}>
          {loadingWSS ? (
            <div className={styles.loaderContainer}>
              <Loaders />
            </div>
          ) : (
            <div className={styles.cardsContainer}>
              {planesWSS.map((plan) => (
                <div key={plan.id} className={`${styles.card} ${styles.wss}`}>
                  <h3 className={styles.cardTitle}>{plan.Servicio}</h3>

                  <p className={styles.price}>${plan.Precio}</p>
                  <span className={styles.month}>por mes</span>

                  <ul className={styles.features}>
                    <li>Velocidad {plan.Velocidad}</li>
                    <li>Conexión inalámbrica</li>
                    <li>Ideal zonas sin fibra</li>
                  </ul>

                  <Link to="/Contacto" className={styles.btn}>
                    Más info
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
