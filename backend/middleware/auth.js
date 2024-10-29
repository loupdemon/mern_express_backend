const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = res.headers.autorization.split("")[1]; // recuperer le token, on recupere le header, on divise chaine de caracete autour d el'espace, entre barrer et token, on récupere le seocnd donc index 1
        const decoderToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //onecodele token
        const userId = decoderToken.userId;
        req.auth = {
            userId: userId,
        };
    } catch (error) {
        res.status(401).json({ error });
    }
};
