import style from "../styles/Loaders.module.css";
import logo from "../assets/images/LogoEmpresa/Imagotipo-Villa-Giardino.png";
export const Loaders = () => {
  return (
    <div className={style.mainDiv}>
      <img src={logo} alt="Logo" className={style.logo} />
    </div>
  );
};
