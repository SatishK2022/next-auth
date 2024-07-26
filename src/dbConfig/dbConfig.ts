import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${"NextAuth"}`);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("✅ Mongo DB Connected.")
        })

        connection.on("error", (error) => {
            console.log("❌ Mongo DB Connection Error", error);
            process.exit(1);
        })
    } catch (error) {
        console.log("Error Connecting to DB", error);
    }
}