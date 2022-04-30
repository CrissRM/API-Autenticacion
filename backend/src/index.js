require("dotenv").config();

const app = require("./app"),
  connectDB = require("./db/database");

const main = async () => {
  await connectDB();
  app.listen(app.get("port"));
  console.log(
    `Serivor corriendo: ${app.get("prot")}${app.get("host")}:${app.get("port")}`
  );
};

main();
