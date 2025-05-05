const express = require("express")
const Doctor_Router = express.Router();
const {Get_All_Doctors, Add_Doctor} = require("../controllers/Doctor_Controllers.js");

Doctor_Router.post("/add_doctor", Add_Doctor)
Doctor_Router.get("/get_all_doctors", Get_All_Doctors)

module.exports = Doctor_Router;