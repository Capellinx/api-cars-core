import { Message } from "amqplib";

export interface MessagingService {
   start(): Promise<void>,
   createQueue({ queueName }: { queueName: string }): Promise<void>,
   publishInQueue({ queueName, message }: { queueName: string, message: string }): Promise<boolean>,
   consumeQueue({ queueName, callback }: { queueName: string, callback: Function }): Promise<void>
   checkQueue({ queueName }: { queueName: string }): Promise<{ messageCount: number, consumerCount: number }> 
   close(): Promise<void>
}