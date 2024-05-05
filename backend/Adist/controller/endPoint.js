var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mySqlDB from "../databases/mysql/mysqlFunctions.js";
import mongoDb from "../databases/mongoDB/mongoDbFunctions.js";
import passwordsSchema from "../databases/mongoDB/schema/schema.js";
export default {
    getALlPasswords: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            id: "AXX",
            title: "A",
            description: "A",
            startWith: "A",
            password: "A",
            secondPassword: "A",
            email: "A",
            phone: "A",
            twoFAPassword: "A",
            username: "A",
            date: 23213213,
            tags: ["A"],
            fullTag: [
                {
                    id: "A",
                    tagName: "A",
                    tagNameRecover: "A",
                    edit: true,
                    date: 342342,
                    editIcon: false,
                },
            ],
            favorite: true,
            website: "A",
        };
        //   let rawResult = await mySqlDB.getAll("passwords")
        // this function will split tags by , and will put it into an array of strings
        //   const convertStringTagsToArray = () => {
        //      let passwordFields = rawResult.data as PasswordFields[]
        //      if (passwordFields) {
        //         for (let i = 0; i < passwordFields.length; i++) {
        //            const currentTag = passwordFields[i].tags
        //            if (typeof currentTag === "string") {
        //               passwordFields[i].tags = currentTag.split(",")
        //            }
        //         }
        //      }
        //      return passwordFields
        //   }
        //   rawResult.data = convertStringTagsToArray()
        const result = yield mongoDb.getFromDB("passwords");
        res.status(200).json({ success: true, error: false, message: "ok", response: result });
    }),
    getFavoritePasswords: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let rawResult = yield mySqlDB.getBySpecificField({ tableName: "passwords", fields: { favorite: true } });
        // this function will split tags by , and will put it into an array of strings
        const convertStringTagsToArray = () => {
            let passwordFields = rawResult.data;
            if (passwordFields) {
                for (let i = 0; i < passwordFields.length; i++) {
                    const currentTag = passwordFields[i].tags;
                    if (typeof currentTag === "string") {
                        passwordFields[i].tags = currentTag.split(",");
                    }
                }
            }
            return passwordFields;
        };
        rawResult.data = convertStringTagsToArray();
        res.status(200).json(rawResult);
    }),
    setData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const result = await mongoDb.setToDB("passwords", req.body)
        // console.log(result)
        mongoDb.setToDB(req.body, "passwords", passwordsSchema);
        res.json("ok");
    }),
};
