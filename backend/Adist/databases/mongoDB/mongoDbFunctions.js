var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { model } from "mongoose";
const getFromDB = (tableName, tableSchema) => __awaiter(void 0, void 0, void 0, function* () {
    //  return await db.collection(dbName).find().toArray()
    const items = yield model(tableName, tableSchema).find();
    return items;
});
const setToDB = (data, tableName, tableSchema) => __awaiter(void 0, void 0, void 0, function* () {
    // return await db.collection(dbName).insertOne(data)
    //  console.log("Imported schema:", tableSchema)
    const final = model(tableName, tableSchema);
    try {
        yield final.create(data);
    }
    catch (error) {
        return error;
    }
});
export default {
    getFromDB,
    setToDB,
};
