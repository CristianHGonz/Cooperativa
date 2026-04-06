import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

// 🔥 obtener por categoría
router.get("/categoria/:tipo", async (req, res) => {
    try {
        const { tipo } = req.params;

        const snapshot = await db
            .collection("planes")
            .where("Categoria", "==", tipo)
            .get();

        const planes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json(planes);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔥 TODOS
router.get("/all", async (req, res) => {
    const snapshot = await db.collection("planes").get();

    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    res.json(data);
});

// 🔥 actualizar
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        console.log("🛠 Actualizando:", id, data);

        await db.collection("planes").doc(id).set(data, { merge: true });

        res.json({ success: true });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;