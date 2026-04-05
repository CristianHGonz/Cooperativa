import Style from "../styles/SocialBar.module.css";

import emailIcon from "../assets/images/media/mail.png";
import whatsappIcon from "../assets/images/media/whatsapp.png";
import facebook from "../assets/images/media/fb.png";
import instagram from "../assets/images/media/ig.png";
import mediaX from "../assets/images/media/x.png";

export const SocialBar = () => {
  return (
    <div className={Style.socialBar}>
      <div className={Style.redSocial}>
        <a
          href="https://www.instagram.com/cooperativavillagiardino/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={Style.icon}
            src={instagram}
            alt="red social instagram"
          />
        </a>
      </div>
      <div className={Style.redSocial}>
        <a
          href="https://www.facebook.com/CooperativaVillaGiardinoLtda/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={Style.icon}
            src={facebook}
            alt="red social Facebook"
          />
        </a>
      </div>
      <div className={Style.redSocial}>
        <a
          href="https://www.threads.com/@cooperativavillagiardino"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={Style.icon} src={mediaX} alt="red social X" />
        </a>
      </div>
      <div className={Style.redSocial}>
        <a
          href="mailto:infocoopgiardino@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={Style.icon} src={emailIcon} alt="icono email" />
        </a>
      </div>
      <div className={Style.redSocial}>
        <a
          href="https://wa.me/5493548598950"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={Style.icon} src={whatsappIcon} alt="icono whatsapp" />
        </a>
      </div>
    </div>
  );
};
