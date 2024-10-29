const Thing = require("../models/Things");

exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body,
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
};

exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //methode updateOne de mongoose pour mettre à jour un objet
        //faaudrait mettre que l'id correspond à celui de l'objet modifié
        .then(() => res.status(200).json({ message: "Objet modifié !" })) //rtourne une promesse si tout est ok
        .catch((error) => {
            console.error("Erreur MongoDB :", error);
            res.status(400).json({ error });
        });
};

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id }) //methode deleteOne de mongoose pour supprimer un objet
        .then(() => res.status(200).json({ message: "Objet supprimé !" })) //retourne une promesse si tout est ok
        .catch((error) => res.status(400).json({ error }));
};

//REQUETTE pour recuperer un objet
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }) //methode findOne de mongoose pour trouver un objet unique dans la base de données
        //methode then pour renvoyer l'objet trouvé id thing soit meme que requette
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(404).json({ error }));
};

exports.getAllThings = (req, res, next) => {
    Thing.find() //methode find de mongoose pour renvoyer un tableau contenant tous les objets dans la base de données
        .then((things) => res.status(200).json(things))
        .catch((error) => res.status(400).json({ error }));
};
