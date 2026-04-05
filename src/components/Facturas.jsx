import styles from "../styles/Facturas.module.css";
import { useState, useEffect } from "react";
import ejFactura from "../assets/images/facturas/ejFactura.png";
import Swal from "sweetalert2";

export const Facturas = () => {
  const [numero, setNumero] = useState("");
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    fetch("/facturas.json")
      .then((res) => res.json())
      .then((data) => setArchivos(data));
  }, []);

  const buscar = () => {
    const encontrado = archivos.find((a) => a.includes(numero));

    if (encontrado) {
      window.open(`/facturas/${encontrado}`, "_blank");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Número de abonado inexistente",
        width: "300px",
      });
    }
  };
  return (
    <div>
      <h2 className={styles.tituloFacturas}>Buscar tu factura</h2>
      <div className={styles.encontrarFactura}>
        <p className={styles.text}>¿Donde encuentro mi número de factura?</p>
        <div className={styles.ejFacturaWrapper}>
          <img
            className={styles.ejFactura}
            src={ejFactura}
            alt="ej donde encontrara facturas"
          />
        </div>
      </div>
      <div className={styles.divInput}>
        <input
          type="text"
          placeholder="ej 491009"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className={styles.input}
        />
        <button onClick={buscar} className={styles.boton}>
          Buscar
        </button>
      </div>
      <h3 className={styles.tituloFacturas}>Formas de pago</h3>
      <div className={styles.formasPago}>
        <div className={styles.bloque}>
          <h4 className={styles.pagoTitulo}>Transferencias bancarias:</h4>
          <p>
            CBU: 2850884730000012223069 <br /> Alias de CBU: CoopVillaGiardino
            <br /> Razón Social: COOP VILLA GIARDINO DE SERVICIO <br />
            Identificación tributaria: 30615212748 <br /> Tipo y número de
            cuenta: <br /> CUENTAS CORRIENTES
          </p>
        </div>

        <div className={styles.bloque}>
          <h4 className={styles.pagoTitulo}>Pago mis cuentas:(Banelco)</h4>
          <p>
            Debe buscar como Empresa: Coop Villa Giardino <br /> Luego ingresar
            su número de cliente: <br /> 3548-491009 <br /> deberá anotarlo de
            la siguiente manera: <br />
            415913548491009
          </p>
        </div>

        <div className={styles.bloque}>
          <h4 className={styles.pagoTitulo}>Pago fácil</h4>
          <p>
            Puede pagar su factura en cualquier sucursal <br /> de pago fácil
            siempre y cuando la factura no este <br /> vencida
          </p>
        </div>
      </div>
    </div>
  );
};
