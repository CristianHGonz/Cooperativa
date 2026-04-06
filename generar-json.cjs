const fs = require("fs");
const path = require("path");

const carpeta = path.join(__dirname, "public", "facturas");

const archivos = fs.readdirSync(carpeta).filter(nombre => nombre.endsWith(".pdf"));

const salida = path.join(__dirname, "public", "facturas.json");

fs.writeFileSync(salida, JSON.stringify(archivos, null, 2));

console.log("facturas.json generado correctamente en /public");