const bcrypt = require("bcrypt");

const User = require("../models/User");

//on aura besoind e deux middleware fonction sign-up et sign-in

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10) //hachage du mot de passe en 10 tours, , chaque plus tours plus de complexité mais plus temps de reponse
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() =>
                    res.status(200).json({ message: "utilisateur crée!" })
                )
                .catch((error) => res.status(400).json({ errror }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {};
