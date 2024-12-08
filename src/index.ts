import app from "./server";
import * as dotenv from "dotenv";
dotenv.config();

app.listen(8080, () => {
  console.log("server is running");
});
