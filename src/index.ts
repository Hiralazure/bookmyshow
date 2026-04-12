import { createServer } from "node:http";
import { createApplication } from "./app";

async function startServer() {
  try {
    const app = await createApplication();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error is starting server ${error}`);
    throw error;
  }
}
startServer();
