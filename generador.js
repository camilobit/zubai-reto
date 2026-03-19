const fs = require("fs");

function generadorCodigo(spec) {
  const endpoint = spec.endpoints[0];

  return `
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function run() {
  try {
    const response = await fetch("${spec.base_url}${endpoint.path}");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    return {
      source: "${spec.name}",
      data: data,
      normalized_at: new Date().toISOString()
    };

  } catch (error) {
    console.error("Error:", error);
  }
}

run().then(console.log);
`;
}

function main() {
  const spec = JSON.parse(fs.readFileSync("api.json", "utf-8"));
  const code = generadorCodigo(spec);

  fs.writeFileSync("generated-client.js", code);
  console.log(" :) Código generado!");
}

main();