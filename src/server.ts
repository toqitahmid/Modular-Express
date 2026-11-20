import app from "./app";
import { config } from "./config";
import { initDB } from "./db";

const main = () => {
  initDB();
  app.listen(config.PORT, () => {
    console.log(`The Express server is running on port ${config.PORT}`);
  })
}

main();