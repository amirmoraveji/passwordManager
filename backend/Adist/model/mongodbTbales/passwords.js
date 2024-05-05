import mongoose from "mongoose";
const { Schema, model } = mongoose;
const passwordsSchema = new Schema({
    id: String,
    title: String,
    description: String,
    startWith: String,
    password: String,
    secondPassword: String,
    email: String,
    phone: String,
    twoFAPassword: String,
    username: String,
    date: Number,
    tags: [String],
    fullTag: [
        {
            id: String,
            tagName: String,
            tagNameRecover: String,
            edit: Boolean,
            date: Number,
            editIcon: Boolean,
        },
    ],
    favorite: Boolean,
    website: String,
});
const passwords = model("passwords", passwordsSchema);
export default passwords;
