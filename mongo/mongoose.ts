import mongoose, { MongooseError } from "mongoose";

export class MongoConnection {
   async connect() {
      try {
         await mongoose.connect("mongodb://mongo-db:27017/cardb");
         console.log("🎲 Connected to database");
      } catch (error) {
         if(error instanceof MongooseError) {
            console.error("❌ Failed to connect to database:", error.message);
            console.error("❌ Full Error:", error);
            throw new Error(`❌ Failed to connect to database -> ${error.message}`);
         }
         throw new Error("❌ Failed to connect to database");
      }
   }
}
