import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

// crear contratación
router.post("/", async (req, res) => {
    try {
        const data = req.body;

        // evitar duplicados por DNI
        const snapshot = await db
            .collection("contrataciones")
            .where("dni", "==", data.dni)
            .get();

        if (!snapshot.empty) {
            return res.status(400).json({
                error: "Ya existe contratación para este DNI",
            });
        }

        const docRef = await db.collection("contrataciones").add(data);

        res.json({ id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// obtener todas
router.get("/", async (req, res) => {
    const snapshot = await db.collection("contrataciones").get();

    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    res.json(data);
});

export default router;