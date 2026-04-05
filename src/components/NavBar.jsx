import { NavBarConteiner } from "./NavBarConteiner";
export const NavBar = ({ menuAbierto, toggleMenu, cerrarMenu }) => {
  return (
    <NavBarConteiner
      menuAbierto={menuAbierto}
      toggleMenu={toggleMenu}
      cerrarMenu={cerrarMenu}
    />
  );
};
