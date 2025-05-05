import { createClient } from "redis";
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const redisClient = createClient({
  url: `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.connect();

export { redisClient };
