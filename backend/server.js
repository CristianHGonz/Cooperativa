import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import planesRoutes from "./routes/planes.js";
import contratacionesRoutes from "./routes/contrataciones.js";
import referenciasRoutes from "./routes/referencias.js";

dotenv.config();

// ✅ PRIMERO crear app
const app = express();

// ✅ MIDDLEWARES
app.use(cors());
app.use(express.json());

// ✅ DESPUÉS las rutas
app.use("/api/planes", planesRoutes);
app.use("/api/contrataciones", contratacionesRoutes);
app.use("/api/referencias", referenciasRoutes);

// ✅ PUERTO
const PORT = 3000;

// ✅ LEVANTAR SERVER
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});