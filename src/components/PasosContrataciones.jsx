import Styles from "../styles/ContratarServ.module.css";
export const PasosContrataciones = ({ pasoActual, setPasoActual }) => {
  return (
    <div className={Styles.pasos}>
      {[1, 2, 3, 4].map((paso) => {
        const deshabilitado = paso > pasoActual;

        return (
          <div
            key={paso}
            onClick={() => {
              if (!deshabilitado) {
                setPasoActual(paso);
              }
            }}
            className={`${Styles.paso2} ${
              deshabilitado ? Styles.disabled : ""
            }`}
          >
            <p className={Styles.espacio}>
              <strong className={Styles.numero}>{paso}</strong>
            </p>
          </div>
        );
      })}
    </div>
  );
};
