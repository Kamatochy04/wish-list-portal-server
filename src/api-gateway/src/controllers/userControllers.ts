import { redisPublisher, redisSubscriber } from "../redis/redis";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const pendingRequests = new Map<string, (value: any) => void>();

redisSubscriber.subscribe("api_responses", (message) => {
  try {
    const { requestId, data, error } = JSON.parse(message);
    const resolver = pendingRequests.get(requestId);
    if (resolver) {
      resolver(error ? { error } : { data });
      pendingRequests.delete(requestId);
    }
  } catch (err) {
    console.error("Error processing response:", err);
  }
});

export const register = async (req: Request, res: Response) => {
  const requestId = uuidv4();
  const userData = req.body;

  const response = new Promise((resolve) => {
    pendingRequests.set(requestId, resolve);
  });

  try {
    await redisPublisher.publish(
      "auth_requests",
      JSON.stringify({
        requestId,
        type: "register",
        data: {
          email: userData.email,
          password: userData.password,
          username: userData.username || null,
        },
      })
    );

    const result = await Promise.race([
      response,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Service timeout")), 5000)
      ),
    ]);

    res.status(400).json(result);
  } catch (err) {
    pendingRequests.delete(requestId);
    console.error("Registration error:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "Internal server error",
    });
  }
};
