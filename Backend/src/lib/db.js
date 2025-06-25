import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
       const conn =  await mongoose.connect(process.env.MONGODB_URI);
       if(conn){
          console.log("MongoDB Connected SuccesFully");
       }else{
        console.log("MongoDB Not Connected");
       }
       
    }catch(error){
       console.log("MongoDB connection error:",error);
    }
};