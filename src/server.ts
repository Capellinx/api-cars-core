import { MongoConnection } from "../mongo/mongoose";
import { app } from "./app";
import { env } from "./config/env";
class Server {
   private mongoServer = new MongoConnection();

   constructor(){
      this.startServer();
   }

   private async startDatabase(){
      await this.mongoServer.connect();
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