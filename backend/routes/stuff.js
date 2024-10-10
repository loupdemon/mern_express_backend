//ce fichier content la logique métier de l'application
const express = require("express");
const router = express.Router();

//importer le controller
const stuffCtrl = require("../controllers/stuff");

//REQUETTE POST POUR CREER UN OBJET
router.post("/", stuffCtrl.createThing); //les roues sont plus claire et plus simple à lire avec les noms des fonctions sémantiques
//REQUETTE pour recuperer un objet
router.get("/:id", stuffCtrl.getOneThing);
//REQUETTE PUT POUR MODIFIER UN OBJET
router.put("/:id", stuffCtrl.modifyThing);
//Suppression d'un objet
router.delete("/:id", stuffCtrl.deleteThing);
//REQUETTE GET POUR RECUPERER les objets comme un get all
router.get("/", stuffCtrl.getAllThings);

module.exports = router;
