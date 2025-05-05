import { createClient } from "redis";

const redisClient = createClient({ url: "redis://localhost:6379" });
const redisPublisher = redisClient.duplicate();
const redisSubscriber = redisClient.duplicate();

Promise.all([
  redisClient.connect(),
  redisPublisher.connect(),
  redisSubscriber.connect(),
]).catch((err) => {
  console.error("Redis connection error:", err);
});

export { redisClient, redisPublisher, redisSubscriber };
