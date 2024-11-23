const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Extraire le token de l'en-tête Authorization
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Vérifier la validité du token
        const userId = decodedToken.userId; // Extraire l'ID de l'utilisateur à partir du token
        req.auth = { userId: userId }; // Attacher l'ID de l'utilisateur à l'objet req
        next(); // Passer à la prochaine étape
    } catch (error) {
        res.status(401).json({ error: "Invalid or missing token" }); // Si le token est invalide ou manquant
    }
};

/*rappel:
-La méthode verify() du package jsonwebtoken permet de vérifier la validité d'un token (sur une requête entrante, par exemple).
-Ajoutez bien votre middleware d'authentification dans le bon ordre sur les bonnes routes.
-Attention aux failles de sécurité !*/
