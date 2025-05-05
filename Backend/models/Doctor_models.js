const mongoose = require("mongoose");

const Create_Doctor_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    qualification: {
        type: String,
        required: true,
        trim: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        required: true
    },
    languages: {
        type: [String],
        default: []
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    clinicName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    consultationFee: {
        type: Number,
        required: true
    },
    availability: {
        type: [String],
        default: []
    },
    imageUrl: {
        type: String,
        default: 'default-doctor.jpg'
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Create_Doctor_Model = mongoose.model("Create_Doctor_Model", Create_Doctor_Schema);
module.exports = Create_Doctor_Model;