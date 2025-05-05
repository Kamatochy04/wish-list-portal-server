import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createClient } from "redis";

export const redisPublisher = createClient({ url: "redis://localhost:6379" });
export const redisSubscriber = redisPublisher.duplicate();

Promise.all([redisPublisher.connect(), redisSubscriber.connect()]).catch(
  (err) => {
    console.error("Redis connection error:", err);
  }
);

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());

redisSubscriber.subscribe("auth_requests", async (message) => {
  try {
    const { requestId, type, data } = JSON.parse(message);

    if (type === "register") {
      const user = { name: "Andrey" };

      await redisPublisher.publish(
        "api_responses",
        JSON.stringify({
          requestId,
          data: { success: true, user },
        })
      );
    }
  } catch (err) {
    console.error("Error processing auth request:", err);
  }
});

app.listen(PORT, () => {
  console.log(`auth server  is running on http://localhost:${PORT}`);
});

export default app;
