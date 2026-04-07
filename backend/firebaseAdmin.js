// import admin from "firebase-admin";
// import fs from "fs";

// const serviceAccount = JSON.parse(
//     fs.readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
// );

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// export const db = admin.firestore();
import admin from "firebase-admin";

// Inicialización de Firebase usando variables de entorno
const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();