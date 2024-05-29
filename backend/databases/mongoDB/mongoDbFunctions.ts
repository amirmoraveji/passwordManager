import mongoose, { model } from "mongoose"

const getFromDB = async (tableName: string, tableSchema: mongoose.Schema) => {
    //  return await db.collection(dbName).find().toArray()
    const items = await model(tableName, tableSchema).find()
    return items
}
const setToDB = async (data: object, tableName: string, tableSchema: mongoose.Schema) => {
    // return await db.collection(dbName).insertOne(data)
    //  console.log("Imported schema:", tableSchema)
    const final = model(tableName, tableSchema)
    try {
        await final.create(data)
    } catch (error) {
        return error
    }
}

export default {
    getFromDB,
    setToDB,
}
