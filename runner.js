const { exec } = require("child_process");

exec("node generated-client.js", (error, stdout, stderr) => {
  if (error) {
    console.error("Execution error:", error);
    return;
  }

  console.log("Result:\n", stdout);
});