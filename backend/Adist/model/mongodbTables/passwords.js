import mongoose from "mongoose";
const { Schema } = mongoose;
const passwordsSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startWith: { type: String, required: true },
    password: { type: String, required: true },
    secondPassword: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    twoFAPassword: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: Number, required: true },
    tags: [{ type: String, required: true }],
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
    website: { type: String, required: true },
}, { strict: true } //strict true will not save any data that is not defined in the schema
);
export default passwordsSchema;
