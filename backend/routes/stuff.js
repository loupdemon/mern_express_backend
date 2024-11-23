//ce fichier content la logique métier de l'application et les liens des routes
/*rapel:
-La méthode : express.Router()  vous permet de créer des routeurs séparés pour 
 chaque route principale de votre application – vous y enregistrez ensuite les routes individuelles.*/

const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

//importer le controller
const stuffCtrl = require("../controllers/stuff");

//REQUETTE pour recuperer un objet
router.get("/:id", auth, stuffCtrl.getOneThing);
//REQUETTE POST POUR CREER UN OBJET
router.post("/", auth, stuffCtrl.createThing); //les roues sont plus claire et plus simple à lire avec les noms des fonctions sémantiques
//REQUETTE PUT POUR MODIFIER UN OBJET
router.put("/:id", auth, stuffCtrl.modifyThing);
//Suppression d'un objet
router.delete("/:id", auth, stuffCtrl.deleteThing);
//REQUETTE GET POUR RECUPERER les objets comme un get all
router.get("/", auth, stuffCtrl.getAllThings);

module.exports = router;
