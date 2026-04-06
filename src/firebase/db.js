import { eliminarArchivo } from "./storage";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    // addDoc,
    //updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { app } from "./config";
const API_URL = import.meta.env.VITE_API_URL;
const db = getFirestore(app);

// 🔥 PLANES
// export const obtenerPlanes = async (tipo) => {
//     const q = query(collection(db, "planes"), where("Categoria", "==", tipo));

//     const querySnapshot = await getDocs(q);

//     return querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));
// };
export const obtenerPlanes = async (tipo) => {
    const res = await fetch(`${API_URL}/api/planes/categoria/${tipo}`);

    if (!res.ok) throw new Error("Error cargando planes");

    return await res.json();
};

// 🔥 SERVICIOS
// export const obtenerServicios = async () => {
//     const snapshot = await getDocs(collection(db, "planes"));

//     return snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));
// };
export const obtenerServicios = async () => {
    const res = await fetch(`${API_URL}/api/planes/all`);

    return await res.json();
};

// export const actualizarServicio = async (id, data) => {
//     const ref = doc(db, "planes", id);
//     await updateDoc(ref, data);

// };
export const actualizarServicio = async (id, data) => {
    const res = await fetch(`${API_URL}/api/planes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.error);

    return result;
};

// 🔥 CONTRATACIONES
// export const guardarContratacion = async (data) => {
//     // 🔥 evitar duplicados por DNI
//     const q = query(
//         collection(db, "contrataciones"),
//         where("dni", "==", data.dni)
//     );

//     const snapshot = await getDocs(q);

//     if (!snapshot.empty) {
//         console.log("⚠️ Ya existe contratación para este DNI");
//         return;
//     }

//     const docRef = await addDoc(collection(db, "contrataciones"), data);
//     return docRef.id;
// };
export const guardarContratacion = async (data) => {
    const res = await fetch(`${API_URL}/api/contrataciones`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.error);

    return result.id;
};

// export const obtenerContrataciones = async () => {
//     const snapshot = await getDocs(collection(db, "contrataciones"));

//     return snapshot.docs.map((doc) => ({
//         id: doc.id, // 👈 ESTE ES EL BUENO
//         ...doc.data(),
//     }));
// };
export const obtenerContrataciones = async () => {
    const res = await fetch(`${API_URL}/api/contrataciones`);
    return await res.json();
};
// export const eliminarContratacion = async (id) => {
//     await deleteDoc(doc(db, "contrataciones", id));
// };
export const eliminarContratacion = async (id) => {
    await fetch(`${API_URL}/api/contrataciones/${id}`, {
        method: "DELETE",
    });
};


// export const crearReferenciaManual = async (codigo, importe) => {
//     try {
//         await addDoc(collection(db, "referencia"), {
//             codigo,
//             importe,
//             usado: false,
//             fecha: new Date(),
//         });
//     } catch (error) {
//         console.error("Error creando referencia:", error);
//     }
// };
export const crearReferenciaManual = async (codigo, importe) => {
    const res = await fetch(`${API_URL}/api/referencias`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo, importe }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    return data;
};


// export const obtenerReferencias = async () => {


//     const snapshot = await getDocs(collection(db, "referencia"));



//     return snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));
// };
// export const eliminarReferencia = async (id) => {
//     await deleteDoc(doc(db, "referencia", id));
// };

export const obtenerReferencias = async () => {
    const res = await fetch(`${API_URL}/api/referencias`);
    return await res.json();
};
export const eliminarReferencia = async (id) => {
    await fetch(`${API_URL}/api/referencias/${id}`, {
        method: "DELETE",
    });
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