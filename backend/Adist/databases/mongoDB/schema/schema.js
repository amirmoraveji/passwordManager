import mongoose from "mongoose";
const { Schema } = mongoose;
const passwordsSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    startWith: { type: String },
    password: { type: String, required: true },
    secondPassword: { type: String },
    email: { type: String },
    phone: { type: String },
    twoFAPassword: { type: String },
    username: { type: String, required: true },
    date: { type: Number, required: true },
    tags: [{ type: String }],
    fullTag: [
        {
            id: { type: String, required: true },
            tagName: { type: String, required: true },
            tagNameRecover: { type: String, required: true },
            edit: { type: Boolean, required: true },
            date: { type: Number, required: true },
            editIcon: { type: Boolean, required: true },
        },
    ],
    favorite: { type: Boolean, required: true },
    website: { type: String },
}, { strict: true } //strict true will not save any data that is not defined in the schema
);
export default passwordsSchema;
