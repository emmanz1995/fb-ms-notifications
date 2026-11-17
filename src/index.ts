import { createServer } from "node:http";
import app from "./app";
import {disconnectConsumer, setupConsumer} from "./kafka";

const PORT = process.env.PORT || 8085;
const server = createServer(app);

(async () => {
  await setupConsumer()
})()

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

server.close(async () => {
  await disconnectConsumer()
  // process.exit(1);
})
