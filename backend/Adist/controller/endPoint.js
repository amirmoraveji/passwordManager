var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoDb from "../databases/mongoDB/mongoDbFunctions.js";
import passwordsSchema from "../databases/mongoDB/schema/schema.js";
export default {
    getALlPasswords: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield mongoDb.getFromDB("passwords", passwordsSchema);
        res.status(200).json({ success: true, error: false, message: "ok", response: result });
    }),
    getFavoritePasswords: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.json("xxx");
    }),
    setData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const result = await mongoDb.setToDB("passwords", req.body)
        // console.log(result)
        let re = yield mongoDb.setToDB(req.body, "passwords", passwordsSchema);
        res.status(200).json({ success: true, error: false, message: "ok", response: re });
    }),
};
