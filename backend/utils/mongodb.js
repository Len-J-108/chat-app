import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config(); // initializing dotenv package

const {MONGO_URL, DATABASE} = process.env; // getting environment variables

//IIFE to connect to MongoDB
(async function() {
    try{
        const connection = await mongoose.connect(MONGO_URL, {dbName: DATABASE})
        console.log(`Connected to MongoDB,:) db: ${DATABASE}`);
    } catch(err) {
        console.error('Mongo Connection Error!',{err});
      }
})();


