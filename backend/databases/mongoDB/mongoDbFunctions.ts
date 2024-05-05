// const db = client.db("PasswordManager")
import mongoose, { model } from "mongoose"
// import passwords from "../../model/mongodbTables/passwords.js"

const getFromDB = async (dbName: string) => {
    //  return await db.collection(dbName).find().toArray()
    return { name: "amir" }
}
const setToDB = async (data: object, tableName: string, tableSchema: mongoose.Schema) => {
    // return await db.collection(dbName).insertOne(data)
    //  console.log("Imported schema:", tableSchema)
    const final = model(tableName, tableSchema)
    const result = await final.create(data)
}

export default {
    getFromDB,
    setToDB,
}
