const express = require("express");

const app = express();

//accès au corps d ela requette
//ce middleware intercepte qui ont un content type json , met a disposition le corps de la requete sous forme d'objet javascript, dans req.body
app.use(express.json()); //pareil que body.parser mais plus simple

//ajout de middleware CORS
//Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS), des headers spécifiques de contrôle d'accès doivent être précisés pour tous vos objets de réponse.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //accès origine tout le mode
    res.setHeader(
        "Access-Control-Allow-Headers", //on autorise les entêtes suivants
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", //on autorise les méthodes suivants
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.post("/api/stuff", (req, res, next) => {
    console.log(req.body); //pas de bdd , donc aps moyen d'enregistrer les données, on va juster lguer les données reçues
    res.status(201).json({
        message: "Objet créé !",
    });
});

app.get("/api/stuff", (req, res, next) => {
    const stuff = [
        {
            _id: "oeihfzeoi",
            title: "Mon premier objet",
            description: "Les infos de mon premier objet",
            imageUrl:
                "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
            price: 4900,
            userId: "qsomihvqios",
        },
        {
            _id: "oeihfzeomoihi",
            title: "Mon deuxième objet",
            description: "Les infos de mon deuxième objet",
            imageUrl:
                "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
            price: 2900,
            userId: "qsomihvqios",
        },
    ];
    res.status(200).json(stuff);
});

//Middleware
app.use((req, res, next) => {
    console.log("Requête reçue !");
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: "Votre requête a bien été reçue !" }); //objet reponse methode json
});

app.use((req, res) => {
    console.log("Réponse envoyée avec succès !");
});

module.exports = app;
