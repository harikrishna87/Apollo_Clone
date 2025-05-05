const Create_Doctor_Model = require("../models/Doctor_models.js")

const Add_Doctor = async (req, res) => {
    try {
        const newDoctor = new Create_Doctor_Model(req.body);
        const doctor = await newDoctor.save();
        res.status(201).json(doctor);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

const Get_All_Doctors = async(req, res) => {
    try {
        const {
          specialization,
          gender,
          city,
          language,
          experience,
          page = 1,
          limit = 10
        } = req.query;
        const filter = {};
        
        if (specialization) {
          filter.specialization = specialization;
        }
        
        if (gender) {
          filter.gender = gender;
        }
        
        if (city) {
          filter.city = city;
        }
        
        if (language) {
          filter.languages = { $in: [language] };
        }
        
        if (experience) {
          filter.experience = { $gte: parseInt(experience) };
        }
    
        const doctors = await Create_Doctor_Model.find(filter)
          .sort({ rating: -1 })
          .limit(100);
        
        res.json(doctors);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error', error: err.message });
      }
}

module.exports = {Get_All_Doctors, Add_Doctor}