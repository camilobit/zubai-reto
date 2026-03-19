const fs = require("fs");

function generadorCodigo(spec) {
  const endpoint = spec.endpoints[0];

  return `
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Fetch con retry configurado con 3 intentos.
async function fetchWithRetry(url, retries = 3) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.json();

  } catch (error) {
    if (retries > 0) {
      console.log("Retrying...");
      return fetchWithRetry(url, retries - 1);
    }

    throw error;
  }
}

// Función principal que realiza la solicitud a la API y maneja errores, devolviendo un resultado estructurado.
async function run() {
  try {
    const data = await fetchWithRetry("${spec.base_url}${endpoint.path}");

    return {
      source: "${spec.name}",
      data: data,
      normalized_at: new Date().toISOString()
    };

  } catch (error) {
    console.error("Error:", error);

    return {
      source: "${spec.name}",
      data: null,
      normalized_at: new Date().toISOString(),
      error: error.message
    };
  }
}

//  Output controlado con formato JSON, para facilitar su consumo por otros sistemas.
run()
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error("Fatal error:", err);
  });
`;
}

function main() {
  const spec = JSON.parse(fs.readFileSync("api.json", "utf-8"));
  const code = generadorCodigo(spec);

  fs.writeFileSync("generated-client.js", code);
  console.log(" :) Código generado!");
}

main();