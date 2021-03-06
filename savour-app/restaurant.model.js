﻿var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Define Restaurant schema
var restaurantSchema = new Schema({
    name: String,
    location: Object,
    id: String,
    phone: String,
    hours: Object,
    pricing: Number,
    filters: Object,
    type: String,
    rating: Number,
    address: String,
    category: String,
    desc: String,
    website: String,
    menu: String,
    image: String,
    owner: String
}, {collection: "rest"});

//Create Model and export it
module.exports = mongoose.model("rest", restaurantSchema);