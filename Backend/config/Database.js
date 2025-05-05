const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const Mongo_URI = process.env.MONGODB_URI

const Database_Connection = mongoose.connect(Mongo_URI)
.then(() => console.log("MongoDB Connected Successfully..."))
.catch((err) => console.log("MongoDB Connection Error:", err ))

module.exports = Database_Connection;