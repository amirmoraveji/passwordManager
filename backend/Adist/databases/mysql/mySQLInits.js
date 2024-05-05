import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const connectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};
// Create the connection using the type-safe configuration
const connection = mysql.createConnection(connectionConfig);
connection.on("error", (err) => {
    console.error("MySQL connection error :", err.message);
    process.exit(1);
});
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return process.exit(1);
    }
    console.log("Connection to the MySQL database was successful ");
});
process.on("SIGINT", () => {
    console.log("Closing MySQL connection...");
    // Close the MySQL connection
    connection.end((err) => {
        if (err) {
            console.error("Error closing MySQL connection:", err.message);
        }
        else {
            console.log("MySQL connection closed.");
        }
        // Exit the Node.js process
        //!THIS IS SO FUCKING IMPORTANT
        process.exit();
    });
});
export default { connection };
