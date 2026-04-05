import styles from "../styles/Home.module.css";
import obras from "../assets/images/index/img1.jpg";
import mantenimiento from "../assets/images/index/img2.jpg";
import salon from "../assets/images/index/img3.jpg";
import colaboracion from "../assets/images/index/img4.jpg";

export const Home = () => {
  return (
    <div>
      <h1 className={styles.titulo}>Servicios de INTERNET</h1>
      <p className={styles.texto}>
        La Cooperativa de Servicios Públicos “La Coope” nació en el año 2001, en
        respuesta a la creciente necesidad de acceso a internet en las zonas
        rurales y pequeñas comunidades del interior del país, donde las grandes
        empresas de telecomunicaciones no prestaban servicio debido a la baja
        rentabilidad. La iniciativa surgió de un grupo de vecinos, comerciantes
        y docentes locales, quienes vieron en la organización cooperativa una
        forma democrática y solidaria de solucionar esta carencia. Inspirados en
        los principios del cooperativismo, decidieron unir esfuerzos y recursos
        para construir una red comunitaria de acceso a internet. En sus primeros
        años, la cooperativa ofrecía conexión por dial-up y luego evolucionó
        hacia servicios de banda ancha inalámbrica. A través de una gestión
        participativa y transparente, logró acceder a programas de
        financiamiento público y alianzas con otras cooperativas, lo que
        permitió expandir su infraestructura y mejorar la calidad del servicio.
        En la actualidad, “La Coope” brinda servicios de internet de alta
        velocidad a más de 5.000 hogares y empresas, priorizando siempre el
        desarrollo local, la capacitación digital y la inclusión tecnológica. Su
        modelo ha sido reconocido como ejemplo de innovación social y
        tecnológica, destacando cómo el cooperativismo puede adaptarse a los
        desafíos del siglo XXI y garantizar derechos fundamentales como el
        acceso a la información y la conectividad.
      </p>
      <div className={styles.home}>
        <div className={styles.noticia}>
          <h3 className={styles.tituloNota}>Obras y más obras</h3>
          <p className={styles.subTiulo}>Obra en Crecimiento</p>
          <img
            className={styles.imagen}
            src={obras}
            alt="imagen representativa de una obra en curso"
          />

          <p className={styles.textoNota}>
            Expansión de la Red de Fibra Óptica Seguimos conectando el futuro.
            Nos encontramos en plena etapa de crecimiento de nuestra red de
            fibra óptica al hogar (FTTH), avanzando con obras que permitirán
            brindar un servicio de internet más veloz, estable y de alta calidad
            a más familias y comercios de nuestra comunidad. Durante las últimas
            semanas, nuestros equipos técnicos han estado trabajando
            intensamente en la ampliación del tendido de fibra, cubriendo nuevas
            zonas urbanas y proyectando la llegada a sectores rurales. Esta obra
            representa un paso fundamental en nuestro compromiso con la
            inclusión digital y el desarrollo tecnológico local. Con esta
            expansión, buscamos no solo mejorar la calidad del servicio, sino
            también preparar la infraestructura para servicios complementarios
            como televisión digital, telefonía IP y soluciones para empresas.
            Agradecemos la paciencia de los vecinos durante la realización de
            estas tareas y reafirmamos nuestro objetivo de llevar conectividad
            de calidad a cada rincón de nuestra comunidad. ¡Estamos construyendo
            la red del mañana, hoy!
          </p>
        </div>
        <div className={styles.noticia}>
          <h3 className={styles.tituloNota}>Mantenimiento</h3>
          <p className={styles.subTiulo}>
            Programado de Servidores de Internet
          </p>
          <img
            className={styles.imagen}
            src={mantenimiento}
            alt="imagen representativa de una obra en curso"
          />

          <p className={styles.textoNota}>
            Informamos a nuestros usuarios que se realizará una tarea de
            mantenimiento programado en nuestros servidores con el objetivo de
            garantizar un mejor rendimiento, mayor seguridad y estabilidad en el
            servicio. <br />
            🛠Fecha: 30 - Febrero - 2031 <br />
            🕒 Horario estimado: Desde las 00:00 hs hasta las 06:00 hs <br /> 📍
            Zona afectada: Provincia de Córdoba <br />
            📡 Servicio afectado: Internet, posiblemente con interrupciones o
            baja intermitente.
            <br /> Durante este período, podrían producirse breves
            interrupciones en la conexión o disminución en la velocidad del
            servicio. Una vez finalizadas las tareas, el sistema se restablecerá
            automáticamente sin necesidad de intervención del usuario. Pedimos
            disculpas por las molestias que esto pueda ocasionar y agradecemos
            su comprensión. Estas acciones forman parte de nuestro compromiso
            por ofrecer un servicio de internet más robusto, seguro y eficiente.
            Gracias por confiar en nosotros.
          </p>
        </div>
        <div className={styles.noticia}>
          <h3 className={styles.tituloNota}>Salon Multiuso</h3>
          <p className={styles.subTiulo}>
            Te invitamos a disfrutar del Salón de Usos Múltiples de nuestra
            Cooperativa!
          </p>
          <img
            className={styles.imagen}
            src={salon}
            alt="imagen representativa de una obra en curso"
          />

          <p className={styles.textoNota}>
            La Cooperativa pone a disposición de todos sus asociados y la
            comunidad su Salón de Usos Múltiples, un espacio amplio, cómodo y
            totalmente equipado para reuniones, capacitaciones, eventos
            sociales, culturales y comunitarios. <br />
            📍 Ubicación: Av Siempre Viva 853 <br />
            📆 Días y horarios disponibles: Lunes a Viernes de 10:00 hs a 20:00
            hs <br />
            📞 Reservas e informes: 3548-338899 <br />
            📧 Correo: <a href="mailto:">info@lacooperativa.com </a>
            <br />
            👉 Podés solicitar el salón para: Reuniones familiares o
            comunitarias Talleres o cursos Eventos sociales Actividades
            culturales Reuniones institucionales ¡Es un espacio pensado para vos
            y tu comunidad! <br />
            Consultá condiciones de uso y disponibilidad. La Cooperativa siempre
            creciendo con vos.
          </p>
        </div>
        <div className={styles.noticia}>
          <h3 className={styles.tituloNota}>Colaboración con Escuelas</h3>
          <p className={styles.subTiulo}>
            La Cooperativa junto a la Educación Comprometidos con nuestras
            escuelas
          </p>
          <img
            className={styles.imagen}
            src={colaboracion}
            alt="imagen representativa de una obra en curso"
          />

          <p className={styles.textoNota}>
            Desde la Cooperativa, reafirmamos nuestro compromiso con el
            desarrollo de nuestra comunidad a través del apoyo constante a las
            instituciones educativas locales. <br />
            🎓 ¿Cómo colaboramos? Donación de materiales escolares y
            tecnológicos. <br />
            Mejora de infraestructura y conectividad Apoyo a actividades
            culturales y deportivas Charlas y talleres sobre cooperativismo y
            valores comunitarios.
            <br />
            Proyectos conjuntos con docentes y alumnos Sabemos que la educación
            es la base del crecimiento, y por eso acompañamos a nuestras
            escuelas en sus desafíos y proyectos, convencidos de que invertir en
            la educación es construir futuro para todos. <br />
            La Cooperativa – Juntos hacemos comunidad.
          </p>
        </div>
      </div>
    </div>
  );
};
