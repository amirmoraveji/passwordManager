import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const uri = `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@mongodb/${process.env.MONGO_DB_NAME}?authSource=admin&retryWrites=true&w=majority`

mongoose.connect(uri)
const db = mongoose.connection
db.on("error", (error) => {
    console.error("Error connecting to the mongodb:", error)
})

db.once("open", () => {
    console.log("Connected to the mongodb")
})
// this will close the db and cleanup everything properly
process.on("SIGINT", () => {
    db.close().then(() => {
        console.log("MongoDB connection closed")
        process.exit(0)
    })
})
