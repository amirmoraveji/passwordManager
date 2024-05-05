var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import util from "util";
import mySqlInits from "./mySQLInits.js";
const query = util.promisify(mySqlInits.connection.query).bind(mySqlInits.connection);
const isTableNameValid = (tableName) => {
    const validTableNames = ["users", "passwords"]; // valid table names
    return validTableNames.includes(tableName);
};
//? Get All
const getAll = (TableName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return dBFetch(TableName, `SELECT * FROM ${TableName}`);
    }
    catch (err) {
        return { success: false, error: err, message: "select * was not successful" };
    }
});
//? Get by id
const getById = (tableInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const value = [];
    if (tableInfo.id)
        value.push(tableInfo.id);
    try {
        return dBFetch(tableInfo.TableName, `SELECT * FROM ${tableInfo.TableName} WHERE id = ?`, value);
    }
    catch (err) {
        return { success: false, error: err };
    }
});
//? Get by field
const getBySpecificField = (tableInfo) => __awaiter(void 0, void 0, void 0, function* () {
    let SQL = `SELECT * FROM ${tableInfo.tableName} WHERE `;
    const keys = Object.keys(tableInfo.fields);
    const values = [];
    keys.forEach((key) => {
        const value = tableInfo.fields[key];
        if (value !== undefined) {
            SQL += `${key} = ? AND `;
            values.push(value);
        }
    });
    // just to get rid of the last AND that was created in for loop
    SQL = SQL.slice(0, -5);
    try {
        // const rows = (await query(queryOptions)) as object[]
        // if (Object.keys(rows).length === 0) return "Nothing has been found with the given Fields"
        return dBFetch(tableInfo.tableName, SQL, values);
    }
    catch (err) {
        return { success: false };
    }
});
//? Insert
const set = (tableInfo) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `INSERT INTO ${tableInfo.tableName} (`;
    const keys = Object.keys(tableInfo.fields);
    const values = [];
    keys.forEach((key) => {
        const value = tableInfo.fields[key];
        if (value !== undefined) {
            sql += `${key}, `;
            values.push(value);
        }
    });
    sql = sql.slice(0, -2) + ") VALUES (";
    keys.forEach((key) => {
        const value = tableInfo.fields[key];
        if (value !== undefined) {
            sql += `? , `;
        }
    });
    sql = sql.slice(0, -2) + ")";
    try {
        return dBFetch(tableInfo.tableName, sql, values);
    }
    catch (err) {
        return { success: false, error: err, message: "fetch was not successful" };
    }
});
//? Update
const update = (tableInfo) => __awaiter(void 0, void 0, void 0, function* () {
    if (!tableInfo.fields.id)
        return { success: false, message: "Id was not provided" };
    let sql = `UPDATE ${tableInfo.tableName} SET `;
    const fieldNames = Object.keys(tableInfo.fields);
    const values = [];
    fieldNames.forEach((fieldName) => {
        const value = tableInfo.fields[fieldName];
        if (value !== undefined) {
            sql += `${fieldName} = ?, `;
            values.push(value);
        }
    });
    sql = sql.slice(0, -2);
    sql += ` WHERE id = ?`;
    if (tableInfo.fields.id)
        values.push(tableInfo.fields.id);
    try {
        return dBFetch(tableInfo.tableName, sql, values);
    }
    catch (err) {
        return { success: false, error: err, message: "fetch was not successful" };
    }
});
//? Delete
const deleteById = (tableInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const values = [];
    if (tableInfo.fields.id)
        values.push(tableInfo.fields.id);
    try {
        return dBFetch(tableInfo.tableName, `DELETE FROM ${tableInfo.tableName} WHERE id = ?`, values);
    }
    catch (err) {
        return err;
    }
});
//? Custom queries
const customQuery = (tableName, sql, values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return dBFetch(tableName, sql, values);
    }
    catch (err) {
        return { success: false, error: "some error occurred while fetching from DB" };
    }
});
const dBFetch = (tableName, sql, values) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isTableNameValid(tableName))
        return { success: false, message: "table name is not valid" };
    if (!sql)
        return { success: false, message: "sql or values not exist" };
    if (sql.trim().split(";").length > 1)
        return { success: false, error: "Multiple SQL statements are not allowed." };
    // Check if the SQL query string and values are not only present but also valid.
    if (!sql || typeof sql !== "string")
        return { success: false, error: "Invalid input: SQL query or values are missing or incorrect." };
    const queryOptions = {
        sql: sql,
        values: values,
    };
    const result = (yield query(queryOptions));
    if (Object.keys(result).length === 0)
        return { success: true, error: "Nothing has been found with the query" };
    // console.log(query(queryOptions))
    return { success: true, data: result, message: "ok" };
});
export default {
    getAll,
    getById,
    getBySpecificField,
    set,
    update,
    deleteById,
    customQuery,
};
