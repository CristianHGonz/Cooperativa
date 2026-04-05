import styles from "../styles/NavBar.module.css";
import logo from "../assets/images/LogoEmpresa/Logotipo-Villa-Giardino-Horiz.png";
import menu from "../assets/images/icons/menu.jpg";
import { Link } from "react-router-dom";

export const NavBarConteiner = ({ menuAbierto, toggleMenu, cerrarMenu }) => {
  return (
    <header className={styles.header}>
      <div className={styles.divHeader}>
        <div className={styles.divLogo}>
          <Link to="/">
            <img className={styles.logoEmpresa} src={logo} alt="Logo Empresa" />
          </Link>
        </div>

        <div className={styles.contratar}>
          <button className={styles.btnContratar}>
            <Link to="/contratar-servicio">CONTRATAR SERVICIO</Link>
          </button>
        </div>
      </div>

      <nav className={styles.navBar}>
        <div className={styles.hamburguesa} onClick={toggleMenu}>
          <img src={menu} alt="" />
        </div>

        <ul
          className={`${styles.ulNavBar} ${
            menuAbierto ? styles.menuActivo : ""
          }`}
        >
          <li className={styles.liNavBar}>
            <Link to="/" onClick={cerrarMenu}>
              HOME
            </Link>
          </li>
          <li className={styles.liNavBar}>
            <Link to="/servicios" onClick={cerrarMenu}>
              SERVICIOS
            </Link>
          </li>
          <li className={styles.liNavBar}>
            <Link to="/facturas" onClick={cerrarMenu}>
              FACTURAS
            </Link>
          </li>
          <li className={styles.liNavBar}>
            <Link to="/contacto" onClick={cerrarMenu}>
              CONTACTO
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
