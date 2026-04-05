import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loaders } from "../components/Loaders";
import styles from "../styles/Login.module.css";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isAdmin } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin]);
  const handleLogin = async () => {
    setLoading(true);

    try {
      // 🔐 login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass,
      );

      const uid = userCredential.user.uid;
      console.log("UID:", uid);

      // 🔥 buscar en Firestore
      const db = getFirestore();
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      // 🧠 validar admin
      if (docSnap.exists() && docSnap.data().role === "admin") {
        navigate("/admin");
      } else {
        alert("No tenés permisos de administrador");
      }
    } catch (error) {
      console.error("Error login:", error.message);
      alert("Error al iniciar sesión");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {/* IZQUIERDA */}
      <div className={styles.left}>
        <div className={styles.loaderWrapper}>
          <Loaders />
        </div>
      </div>

      {/* DERECHA */}
      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.title}>Acceso al sistema</h2>

          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            className={styles.button}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </div>
    </div>
  );
};
