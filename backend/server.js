import "dotenv/config";
import express from "express";
import cors from "cors";

import planesRoutes from "./routes/planes.js";
import referenciasRoutes from "./routes/referencias.js";
import contratacionesRoutes from "./routes/contrataciones.js";

const app = express();

// 🔥 Middlewares
app.use(cors());
app.use(express.json());

// 🔥 Rutas
app.use("/api/planes", planesRoutes);
app.use("/api/referencias", referenciasRoutes);
app.use("/api/contrataciones", contratacionesRoutes);

// 🔥 Ruta de test
app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

// 🔥 Puerto (obligatorio para Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});