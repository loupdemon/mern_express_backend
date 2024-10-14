const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // l'unicité ne suffit pas ,car il peut  avoir des erreur avec mongodb
    password: { type: String, required: true },
});

//appliquer validator au schema
userSchema.plugin(uniqueValidator);
module.exports = mangoose.model("User", userSchema);
