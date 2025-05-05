import amqplib, { Channel, Connection } from "amqplib";

export const connectRabbitMQ = async (): Promise<void> => {
  const RABBIT_URL = "amqp://localhost";

  try {
    const connection = await amqplib.connect(RABBIT_URL);
    const channel = await connection.createChannel();
  } catch (error) {
    process.exit(1);
  }
};
