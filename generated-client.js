
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function fetchWithRetry(url, retries = 3) {
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Request failed");
  }; 

  return await response.json();
} catch (error) {
  if (retries > 0) {
    console.log("Retrying...");
    return fetchWithRetry(url, retries - 1);
  }
    throw error;
}
}

async function run() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    return {
      source: "Test API",
      data: data,
      normalized_at: new Date().toISOString()
    };

  } catch (error) {
    console.error("Error:", error);
  }
}

run().then(console.log);
