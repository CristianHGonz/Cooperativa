import { useContext } from "react";
import { Context } from "../context/Context";
import { PasoUnoContrataciones } from "./PasosUnoContrataciones";
import { PasoDosContrataciones } from "./PasosDosContrataciones";
import { PasoTresContrataciones } from "./PasosTresContrataciones";
import { PasoCuatroContrataciones } from "./PasoCuatroContrataciones";
import { PasosContrataciones } from "./PasosContrataciones";

export const ContratarServicio = () => {
  const { pasoActual, setPasoActual } = useContext(Context);

  return (
    <>
      <PasosContrataciones
        pasoActual={pasoActual}
        setPasoActual={setPasoActual}
      />
      {pasoActual === 1 && (
        <PasoUnoContrataciones setPasoActual={setPasoActual} />
      )}

      {pasoActual === 2 && (
        <PasoDosContrataciones setPasoActual={setPasoActual} />
      )}
      {pasoActual === 3 && (
        <PasoTresContrataciones setPasoActual={setPasoActual} />
      )}
      {pasoActual === 4 && (
        <PasoCuatroContrataciones setPasoActual={setPasoActual} />
      )}
    </>
  );
};
