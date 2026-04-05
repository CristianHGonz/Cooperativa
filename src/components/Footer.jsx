import styles from "../styles/Footer.module.css";
import logoCoop from "../assets/images/LogoEmpresa/Logotipo-Villa-Giardino-Horiz.png";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* IZQUIERDA */}
      <div className={styles.colIzquierda}>
        <img src={logoCoop} alt="Cooperativa Villa Giardino" />
        <p className={styles.texto}>
          Cooperativa de servicios públicos Villa Giardino
        </p>
      </div>

      {/* MEDIO */}
      <div className={styles.colMedio}>
        <h4>Contacto</h4>

        <p className={styles.texto}>Horarios: 08:00 - 15:30</p>
        <p className={styles.texto}>Dirección: Bv Las Flores 36</p>
        <p className={styles.texto}>Villa Giardino, Córdoba</p>

        <p className={styles.texto}>
          Tel Administración: 03548 491009 / 491900
        </p>
        <p className={styles.texto}>Soporte Internet: 03548 491004 / 491007</p>

        <div className={styles.links}>
          <a
            href="https://wa.me/5493548598950"
            target="_blank"
            rel="noreferrer"
          >
            3548-598950 Mesa de ayuda
          </a>

          <a
            href="https://wa.me/5493548630307"
            target="_blank"
            rel="noreferrer"
          >
            3548-630307 Administración
          </a>

          <a
            href="https://wa.me/5493548634673"
            target="_blank"
            rel="noreferrer"
          >
            3548-634673 Guardia
          </a>

          <a href="mailto:infocoopgiardino@gmail.com">
            info@coopgiardino@gmail.com
          </a>
        </div>
      </div>

      {/* DERECHA */}
      <div className={styles.colDerecha}>
        <p className={styles.copy}>© 2026 Cooperativa Villa Giardino</p>

        <p className={styles.credito}>
          Sitio web desarrollado por{" "}
          <a href="mailto:cristian.hgon@gmail.com">Cristian González</a>
        </p>
      </div>
    </footer>
  );
};
