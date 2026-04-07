import styles from "../styles/NavBar.module.css";
import logo from "../assets/images/LogoEmpresa/Logotipo-Villa-Giardino-Horiz.png";
import menu from "../assets/images/icons/menu.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const NavBarConteiner = ({ menuAbierto, toggleMenu, cerrarMenu }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={styles.header}>
      <div className={styles.divHeader}>
        <div className={styles.divLogo}>
          <Link to="/">
            <img className={styles.logoEmpresa} src={logo} alt="Logo Empresa" />
          </Link>
        </div>

        <div className={styles.contratar}>
          <Link
            to="/contratar-servicio"
            className={`${styles.btnContratar} ${
              scrolled ? styles.btnScrolled : ""
            }`}
          >
            Contratar servicio
          </Link>
        </div>
      </div>
      {scrolled && <div style={{ height: "48px" }}></div>}

      <nav className={`${styles.navBar} ${scrolled ? styles.scrolled : ""}`}>
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
