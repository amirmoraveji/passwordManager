import { ConnectionConfig } from "mysql2"

// Define an interface for the MySQL connection configuration
export interface MySQLConnectionConfig extends Partial<ConnectionConfig> {
   host: string | undefined
   user: string | undefined
   password: string | undefined
   database: string | undefined
}
// database table names
export type mysqlTableNames =
   | {
        tableName: "passwords"
        fields: PasswordFields
     }
   | {
        tableName: "users"
        fields: UsersFields
     }
export type PasswordFields = {
   id?: number
   title?: string
   description?: string
   startWith?: string
   password?: string
   secondPassword?: string
   email?: string
   phone?: string
   twoFAPassword?: string
   username?: string
   date?: number
   tags?: string[] | string
   // fullTag: tagInterface[]
   favorite?: true | false
   website?: string
}

export type UsersFields = {
   id?: number
   userName?: string
   date?: string
}
export type TableNames = "passwords" | "users"
export interface GetById<TableNames> {
   id: number
   TableName: TableNames
}
export interface GetAll<TableNames> {
   TableName: TableNames
}
// Define a union type for allowed field names
// Defining the valid keys and their associated types

// Using a mapped type to apply the types for these keys
export type FieldNameValueType = {
   id?: number
   date?: string
}

export interface QueryResult {
   success: true | false
   data?: object[]
   error?: unknown
   message?: string
}
