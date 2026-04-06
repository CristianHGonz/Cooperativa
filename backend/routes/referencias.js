import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

// 🔥 CREAR REFERENCIA (equivalente a crearReferenciaManual)
router.post("/", async (req, res) => {
    try {
        const { codigo, importe } = req.body;

        // 🟡 validar datos
        if (!codigo || !importe) {
            return res.status(400).json({
                error: "Código e importe son obligatorios",
            });
        }

        // 🔐 normalizar (opcional pero PRO)
        const codigoNormalizado = codigo.toUpperCase();

        // 🔥 VALIDAR DUPLICADO
        const existente = await db
            .collection("referencia")
            .where("codigo", "==", codigoNormalizado)
            .get();

        if (!existente.empty) {
            return res.status(400).json({
                error: "El código ya existe",
            });
        }

        // 💾 guardar
        const nuevaRef = {
            codigo: codigoNormalizado,
            importe,
            usado: false,
            fecha: new Date(),
        };

        const docRef = await db.collection("referencia").add(nuevaRef);

        res.json({
            id: docRef.id,
            ...nuevaRef,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔥 OBTENER REFERENCIAS
router.get("/", async (req, res) => {
    try {
        const snapshot = await db.collection("referencia").get();

        const referencias = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json(referencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔥 ELIMINAR REFERENCIA
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await db.collection("referencia").doc(id).delete();

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔥 MARCAR COMO USADA (esto es PRO 🔐)
router.put("/:id/usar", async (req, res) => {
    try {
        const { id } = req.params;

        const refDoc = db.collection("referencia").doc(id);

        await refDoc.update({
            usado: true,
        });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;