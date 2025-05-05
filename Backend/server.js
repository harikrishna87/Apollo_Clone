const express = require("express");
const Doctor_Router = require("./routes/Doctor_Routes.js")
const Database_Connection = require("./config/Database.js")
const dotenv = require("dotenv")
const cors = require("cors");
const app = express();
dotenv.config();

// Middlewares...
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/apollo", Doctor_Router);

//Database
Database_Connection

//Server
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
