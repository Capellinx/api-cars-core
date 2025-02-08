import { connect, Connection, Channel, Message } from "amqplib";
import { MessagingService } from "../../domain/service/messaging.service";

export class RabbitMQService implements MessagingService {
   private conn: Connection;
   private channel: Channel;

   constructor(private uri: string) { }

   async start(): Promise<void> {
      this.conn = await connect(this.uri);
      this.channel = await this.conn.createChannel();
   }

   async createQueue({ queueName }: { queueName: string }): Promise<void> {
      if (!this.channel) throw new Error("Channel not initialized. Call `start` first.");
      await this.channel.assertQueue(queueName);
   }

   async publishInQueue({
      queueName,
      message
   }: { queueName: string, message: string }): Promise<boolean> {
      if (!this.channel) throw new Error("Channel not initialized. Call `start` first.");
      return this.channel.sendToQueue(queueName, Buffer.from(message));
   }

   async consumeQueue({
      queueName,
      callback
   }: { queueName: string, callback: Function }): Promise<void> {
      if (!this.channel) throw new Error("Channel not initialized. Call `start` first.");
      await this.channel.consume(queueName, (message) => {
         if (message) {
            callback(message);
            this.channel.ack(message);
         }
      });
   }

   async close(): Promise<void> {
      if (this.channel) await this.channel.close();
      if (this.conn) await this.conn.close();
   }
}
