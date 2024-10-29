//ce fichier content la logique métier de l'application
const express = require("express");

const router = express.Router();
const Thing = require("../models/Things.js");

router.post("/", (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body,
        //title: req.body.title,
        //description: req.body.description,
        //imageUrl: req.body.imageUrl,
        //userId: req.body.userId,
        //price: req.body.price,
    });

    thing
        .save()
        .then(() => res.status(201).json({ message: "Objet créé !" }))
        .catch((error) => res.status(400).json({ error }))
        .finally(() => {
            if (!res.headersSent) {
                res.status(500).json({ message: "Erreur interne du serveur" });
            }
        });

    //modele pour tester le server avec nodemon en console et postman
    // console.log(req.body); //pas de bdd , donc aps moyen d'enregistrer les données, on va juster lguer les données reçues
    // res.status(201).json({
    //     message: "Objet créé !",
    // });
});

//REQUETTE pour recuperer un objet
router.get("/:id", (req, res, next) => {
    Thing.findOne({ _id: req.params.id }) //methode findOne de mongoose pour trouver un objet unique dans la base de données
        //methode then pour renvoyer l'objet trouvé id thing soit meme que requette
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(404).json({ error }));
});

//REQUETTE PUT POUR MODIFIER UN OBJET
router.put("/:id", (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //methode updateOne de mongoose pour mettre à jour un objet
        //faaudrait mettre que l'id correspond à celui de l'objet modifié
        .then(() => res.status(200).json({ message: "Objet modifié !" })) //rtourne une promesse si tout est ok
        .catch((error) => {
            console.error("Erreur MongoDB :", error);
            res.status(400).json({ error });
        });
});

//Suppression d'un objet
router.delete("/:id", (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id }) //methode deleteOne de mongoose pour supprimer un objet
        .then(() => res.status(200).json({ message: "Objet supprimé !" })) //retourne une promesse si tout est ok
        .catch((error) => res.status(400).json({ error }));
});

//REQUETTE GET POUR RECUPERER les objets comme un get all
router.get("", (req, res, next) => {
    Thing.find() //methode find de mongoose pour renvoyer un tableau contenant tous les objets dans la base de données
        .then((things) => res.status(200).json(things))
        .catch((error) => res.status(400).json({ error }));

    //modèle pour tester le server avec nodemon en console
    // const stuff = [
    //     {
    //         _id: "oeihfzeoi",
    //         title: "Mon premier objet",
    //         description: "Les infos de mon premier objet",
    //         imageUrl:
    //             "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
    //         price: 4900,
    //         userId: "qsomihvqios",
    //     },
    //     {
    //         _id: "oeihfzeomoihi",
    //         title: "Mon deuxième objet",
    //         description: "Les infos de mon deuxième objet",
    //         imageUrl:
    //             "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
    //         price: 2900,
    //         userId: "qsomihvqios",
    //     },
    // ];
    // res.status(200).json(stuff);
});

module.exports = router;
