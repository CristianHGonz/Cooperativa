import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import styles from "./styles/Layout.module.css";
import { NavBar } from "./components/NavBar";
import { SocialBar } from "./components/SocialBar";
import { Home } from "./components/Home";
import { Servicios } from "./components/Servicios";
import { Facturas } from "./components/Facturas";
import { Contacto } from "./components/Contacto";
import { Error404 } from "./components/Error404";
import { ContratarServicio } from "./components/ContratarServicio";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/Login";
import { AdminPanel } from "./components/AdminPanel";
import { Footer } from "./components/Footer";

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={styles.layout}>
          <div className={styles.navBar}>
            <NavBar
              menuAbierto={menuAbierto}
              toggleMenu={toggleMenu}
              cerrarMenu={cerrarMenu}
            />
            <SocialBar />
          </div>
          <main
            className={`${styles.main} ${
              menuAbierto ? styles.mainAbierto : ""
            }`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/facturas" element={<Facturas />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route
                path="/contratar-servicio"
                element={<ContratarServicio />}
              />
              <Route path="*" element={<Error404 />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPanel />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
