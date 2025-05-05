import { createClient } from "redis";
import { User } from "../controllers/User.model";

const redisSubscriber = createClient({ url: "redis://localhost:6379" });

export async function userSubscribe() {
  await redisSubscriber.connect();

  redisSubscriber.subscribe("user_create", (message) => {
    try {
      const { email, password, userName } = JSON.parse(message);

      User.create({ email, password, userName });

      console.log("user created");
    } catch (console) {}
  });
}
