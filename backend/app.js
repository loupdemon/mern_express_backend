const express = require("express");

const app = express();

app.use("/api/stuff", (req, res, next) => {
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
