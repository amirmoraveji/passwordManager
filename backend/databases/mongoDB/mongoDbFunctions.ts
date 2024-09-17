import mongoose, { model } from "mongoose"

const getFromDB = async (tableName: string, tableSchema: mongoose.Schema) => {
   const items = await model(tableName, tableSchema).find()
   return items
}
const setToDB = async (data: object, tableName: string, tableSchema: mongoose.Schema) => {
   const final = model(tableName, tableSchema)
   try {
      await final.create(data)
      return { error: false, message: "data was inserted successfully", response: data }
   } catch (error) {
      return { error: true, message: "data was not inserted to the db", response: error }
   }
}

export default {
   getFromDB,
   setToDB,
}
