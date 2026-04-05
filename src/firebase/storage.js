import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import { app } from "./config";

const storage = getStorage(app);

// 🔥 SUBIR ARCHIVO (UNICO)
export const subirArchivo = async (file, uid, tipo) => {
    try {
        const uniqueName = `${uid}_${Date.now()}_${file.name}`;
        const path = `contrataciones/${uid}/${tipo}_${uniqueName}`;

        const storageRef = ref(storage, path);

        await uploadBytes(storageRef, file);

        const url = await getDownloadURL(storageRef);

        return {
            url,
            path, // 🔥 clave para borrar después
        };
    } catch (error) {
        console.error("Error subiendo archivo:", error);
        throw error;
    }
};

// 🔥 ELIMINAR ARCHIVO (ROBUSTO)
export const eliminarArchivo = async (path) => {
    try {
        const fileRef = ref(storage, path);
        await deleteObject(fileRef);
    } catch (error) {
        if (error.code === "storage/object-not-found") {
            return; // 👈 no rompe si no existe
        }

        console.error("Error eliminando archivo:", error);
    }
};