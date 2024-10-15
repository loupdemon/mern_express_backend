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
                    res.status(201).json({ message: "utilisateur crée!" })
                )
                .catch((error) => res.status(400).json({ errror }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "Paire login/mot de passe incorrecte" }); //msg doit pas dire si adresse trouvée ou pas , afin de ne pas fuiter la donnée
            }
            bcrypt
                .compare(req.body.password, user.password) //compare entre bcrypt sauvegardé en bdd et le hachage du mdp inséré
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            //401 erreur unauthorized
                            message: "Paire login/mot de passe incorrecte",
                        });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: "TOKEN",
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
