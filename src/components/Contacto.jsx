import Styles from "../styles/Contacto.module.css";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import facebook from "../assets/images/media/fb.png";
import instagram from "../assets/images/media/ig.png";
import mediaX from "../assets/images/media/x.png";

export const Contacto = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [lastSubmit, setLastSubmit] = useState(0);

  const enviarEmail = async (e) => {
    e.preventDefault();

    if (loading) return;
    const now = Date.now();

    if (now - lastSubmit < 10000) {
      Swal.fire({
        icon: "warning",
        title: "Esperá unos segundos antes de volver a enviar",
      });
      return;
    }

    const formData = new FormData(form.current);
    if (formData.get("empresa")) {
      return;
    }
    const data = {
      nombre: formData.get("user_name"),
      direccion: formData.get("user_direccion"),
      contacto: formData.get("user_contacto"),
      email: formData.get("user_email"),
      opciones: formData.get("user_opciones"),
      mensaje: formData.get("user_message"),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      Swal.fire({
        icon: "warning",
        title: "Email inválido",
      });
      return;
    }
    if (data.nombre.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Nombre demasiado corto",
      });
      return;
    }

    if (data.mensaje.length < 10) {
      Swal.fire({
        icon: "warning",
        title: "Mensaje muy corto",
      });
      return;
    }
    const spamWords = ["http", "www", ".com", "crypto", "bitcoin"];

    if (spamWords.some((word) => data.mensaje.toLowerCase().includes(word))) {
      Swal.fire({
        icon: "error",
        title: "Mensaje inválido",
      });
      return;
    }
    setLastSubmit(now);

    setLoading(true);

    try {
      Swal.fire({
        title: "Enviando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE1,
        {
          user_name: data.nombre,
          user_email: data.email,
          message: data.mensaje,
          user_direccion: formData.get("user_direccion"),
          user_contacto: formData.get("user_contacto"),
          user_opciones: formData.get("user_opciones"),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC,
      );

      setLoading(false);
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Mensaje enviado con éxito",
        text: "Te responderemos pronto",
        confirmButtonColor: "#2c7be5",
      });

      if (form.current) form.current.reset();
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.text || "Algo falló al enviar",
      });
    }
  };

  return (
    <>
      <div className={Styles.containerContacto}>
        <div className={Styles.contacto}>
          <form ref={form} onSubmit={enviarEmail} className={Styles.formulario}>
            <input
              type="text"
              name="empresa"
              autoComplete="off"
              tabIndex="-1"
              style={{ position: "absolute", left: "-9999px" }}
            />

            <div className={Styles.inputGroup}>
              <input type="text" name="user_name" required />
              <label>Nombre y Apellido</label>
            </div>
            <div className={Styles.inputGroup}>
              <input type="text" name="user_direccion" required />
              <label>Dirección</label>
            </div>
            <div className={Styles.inputGroup}>
              <input type="email" name="user_email" required />
              <label>Email</label>
            </div>
            <div className={Styles.inputGroup}>
              <input type="tel" name="user_contacto" required />
              <label>Contacto</label>
            </div>
            <div className={Styles.inputGroup}>
              <select name="user_opciones" required>
                <option value=""></option>
                <option value="verificacion">Verificación</option>
                <option value="zona_cobertura">Zona de Cobertura</option>
                <option value="otros">Otros</option>
              </select>
              <label>Tipo de consulta</label>
            </div>
            <div className={Styles.inputGroup}>
              <textarea name="user_message" rows="8" required />
              <label>Mensaje</label>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        </div>
        <div className={Styles.redesMap}>
          <div className={Styles.mapa}>
            <iframe
              title="Ubicación Cooperativa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.405362646925!2d-64.50084068486894!3d-31.05086478152951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d849e463e78b9%3A0xe972fb1898116bcb!2sCooperativa%20Villa%20Giardino!5e0!3m2!1ses!2sar!4v1710000000000"
              loading="lazy"
            ></iframe>
          </div>
          <div className={Styles.redes}>
            <h3 className={Styles.subTitleRedes}>Síguenos en nuestras redes</h3>
            <div className={Styles.logosMedia}>
              <a
                href="https://www.facebook.com/CooperativaVillaGiardinoLtda/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className={Styles.mediaLogos}
                  src={facebook}
                  alt="Logo Facebook"
                />
              </a>
              <a
                href="https://www.instagram.com/cooperativavillagiardino/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className={Styles.mediaLogos}
                  src={instagram}
                  alt="Logo Instagram"
                />
              </a>
              <a
                href="https://www.threads.com/@cooperativavillagiardino"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className={Styles.mediaLogos} src={mediaX} alt="Logo x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
