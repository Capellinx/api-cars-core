import { app } from "./app";


app.listen(process.env.PORT, () => {
   console.log(`🚀 API sucessfully started at port ${process.env.PORT}`);
})