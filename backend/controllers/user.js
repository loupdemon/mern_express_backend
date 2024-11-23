const bcrypt = require("bcrypt");

//import le jsonwebtoken
const jwt = require("jsonwebtoken");

const User = require("../models/User");

//on aura besoind e deux middleware fonction sign-up et sign-in
/*rappel:
-bcrypt  eest un package proposant une fonction de hachage que vous pouvez installer avec  npm 
 la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de « saler » le mot de passe 10 fois; 
 plus la valeur est élevée, plus l'exécution de la fonction sera longue, et plus le hachage sera sécurisé.
-Il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré 
-Le package bcrpyt permet un cryptage sécurisé avec un algorithme unidirectionnel, d'une manière quasi indécryptable.
*/

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10) //hachage du mot de passe en 10 tours,chaque plus tours plus de complexité mais plus temps de reponse
        .then((hash) => {
            /*dans notre bloc then , nous créons un utilisateur et l'enregistrons dans la base de données, 
            en renvoyant une réponse de réussite en cas de succès, et des erreurs avec le code d'erreur en cas d'échec.
            */
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
                /*La méthode compare de bcrypt compare un string avec un hash pour, par exemple, vérifier si un mot de passe entré par 
                l'utilisateur correspond à un hash sécurisé enregistré en base de données. Cela montre que même bcrypt ne peut pas décrypter ses propres hashs.*/
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            //401 erreur unauthorized
                            message: "Paire login/mot de passe incorrecte",
                        });
                    }
                    res.status(200).json({
                        userId: user._id,
                        //token: "TOKEN",
                        token: jwt.sign(
                            { userId: user._id }, //le payload
                            "RANDOM_TOKEN_SECRET", //clé secret d'encodage
                            { expiresIn: "24h" } //configuration expiration après chaque 24h
                        ),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

/*rappel:
Dans le code ci-dessus :
-Nous utilisons la fonction sign de jsonwebtoken pour chiffrer un nouveau token.
-Ce token contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token).
-Nous utilisons une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour crypter notre token (à remplacer par une chaîne 
 aléatoire beaucoup plus longue pour la production). Puisque cette chaîne sert de clé pour le chiffrement et le déchiffrement du token, elle doit être difficile à deviner, sinon n’importe qui pourrait générer un token en se faisant passer pour notre serveur.
-Nous définissons la durée de validité du token à 24 heures. L'utilisateur devra donc se reconnecter au bout de 24 heures.
-Nous renvoyons le token au front-end avec notre réponse.
*/
