import express from "express"
import { Request, Response } from "express" //just to be more precise :)
import routes from "./routes/routes.js"
import dotenv from "dotenv"
import cors from "cors"
import "./databases/mongoDB/mongoDbInits.js" //need this to establish the connection
// import util from "util"
// import mySqlInits from "./databases/mysql/mySQLInits.js"
// util.promisify(mySqlInits.connection.query).bind(mySqlInits.connection)
dotenv.config()
const port = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api", routes)
app.all("*", (req: Request, res: Response) => {
    res.status(404).json("404 Route Not Found")
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
