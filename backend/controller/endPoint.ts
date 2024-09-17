import { Request, Response, response } from "express"
import mongoDb from "../databases/mongoDB/mongoDbFunctions.js"
import { PasswordFields, UsersFields } from "../types/type.js"
import passwordsSchema from "../databases/mongoDB/schema/schema.js"

export default {
   getALlPasswords: async (req: Request, res: Response) => {
      const result = await mongoDb.getFromDB("passwords", passwordsSchema)
      res.status(200).json({ success: true, error: false, message: "ok", response: result })
   },
   getFavoritePasswords: async (req: Request, res: Response) => {
      // let rawResult = await mySqlDB.getBySpecificField({
      //     tableName: "passwords",
      //     fields: { favorite: true },
      // })
      // // this function will split tags by , and will put it into an array of strings
      // const convertStringTagsToArray = () => {
      //     let passwordFields = rawResult.data as PasswordFields[]
      //     if (passwordFields) {
      //         for (let i = 0; i < passwordFields.length; i++) {
      //             const currentTag = passwordFields[i].tags
      //             if (typeof currentTag === "string") {
      //                 passwordFields[i].tags = currentTag.split(",")
      //             }
      //         }
      //     }
      //     return passwordFields
      // }
      // rawResult.data = convertStringTagsToArray()
      res.json("xxx")
   },
   setData: async (req: Request, res: Response) => {
      // const result = await mongoDb.setToDB("passwords", req.body)
      let re = await mongoDb.setToDB(req.body, "passwords", passwordsSchema)
      res.status(200).json(re)
      console.log(re)
   },
}
