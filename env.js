const fs = require("fs");

const env = process.env.uenv;

fs.readFile("./config/api-url.txt", "utf8", (err, url) => {
  if (err) throw err;
  fs.writeFileSync(
    "./environments/current.js",
    `export const baseApiPath = "${
      env === "prod" ? url : "http://127.0.0.1:8000/api/v1"
    }";
export const env = "${env}";`,
    "utf8"
  );
});
