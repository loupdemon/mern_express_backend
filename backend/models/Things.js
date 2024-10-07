const mongoose = require("mongoose");

//schéma de données, on tutilise la méthode Schema de mongoose
//pas besoin de champs id car automatisé par
const thingSchema = mongoose.Schema({
    //La méthode  Schema  de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model("Thing", thingSchema); //La méthode  model  transforme ce modèle en un modèle utilisable.
