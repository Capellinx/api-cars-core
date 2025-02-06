import { prisma } from "../prisma/prisma";
import { app } from "./app";
import { env } from "./env";
class Server {
   constructor(){
      this.startServer();
   }

   private async startDatabase(){
      try {
         await prisma.$connect();
         console.log("🎲 Connected to database");
      } catch (error) {
         throw new Error(`❌ Failed to connect to database -> ${error}`);
      }
   }

   public async startServer(){
      const connectToDatabase = this.startDatabase.bind(this);

      await connectToDatabase();

      app.listen(env.PORT, () => {
         console.log(`🚀 Server started on port ${env.PORT}`)
      });
   }
}

new Server()