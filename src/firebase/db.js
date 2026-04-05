import { eliminarArchivo } from "./storage";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { app } from "./config";

const db = getFirestore(app);

// 🔥 PLANES
export const obtenerPlanes = async (tipo) => {
    const q = query(collection(db, "planes"), where("Categoria", "==", tipo));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

// 🔥 SERVICIOS
export const obtenerServicios = async () => {
    const snapshot = await getDocs(collection(db, "planes"));

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const actualizarServicio = async (id, data) => {
    const ref = doc(db, "planes", id);
    await updateDoc(ref, data);

};


// 🔥 CONTRATACIONES
export const guardarContratacion = async (data) => {
    // 🔥 evitar duplicados por DNI
    const q = query(
        collection(db, "contrataciones"),
        where("dni", "==", data.dni)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        console.log("⚠️ Ya existe contratación para este DNI");
        return;
    }

    const docRef = await addDoc(collection(db, "contrataciones"), data);
    return docRef.id;
};

export const obtenerContrataciones = async () => {
    const snapshot = await getDocs(collection(db, "contrataciones"));

    return snapshot.docs.map((doc) => ({
        id: doc.id, // 👈 ESTE ES EL BUENO
        ...doc.data(),
    }));
};

export const eliminarContratacion = async (id) => {
    await deleteDoc(doc(db, "contrataciones", id));
};



export const crearReferenciaManual = async (codigo, importe) => {
    try {
        await addDoc(collection(db, "referencia"), {
            codigo,
            importe,
            usado: false,
            fecha: new Date(),
        });
    } catch (error) {
        console.error("Error creando referencia:", error);
    }
};
export const obtenerReferencias = async () => {


    const snapshot = await getDocs(collection(db, "referencia"));



    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};
export const eliminarReferencia = async (id) => {
    await deleteDoc(doc(db, "referencia", id));
};

export const eliminarContratacionCompleta = async (contratacion) => {
    try {
        if (!contratacion?.dni) {
            throw new Error("DNI inválido");
        }

        console.log("🧨 Eliminando por DNI:", contratacion.dni);

        const q = query(
            collection(db, "contrataciones"),
            where("dni", "==", contratacion.dni)
        );

        const snapshot = await getDocs(q);

        for (const docItem of snapshot.docs) {
            const data = docItem.data();

            // 🔥 borrar archivos
            if (data.dniPath) {
                await eliminarArchivo(data.dniPath);
            }

            if (data.compPath) {
                await eliminarArchivo(data.compPath);
            }

            console.log("🗑️ Borrando doc:", docItem.id);
            await deleteDoc(doc(db, "contrataciones", docItem.id));
        }

        console.log("✅ TODOS LOS DOCUMENTOS ELIMINADOS");

    } catch (error) {
        console.error("❌ Error eliminando:", error);
        throw error;
    }
};