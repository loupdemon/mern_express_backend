const express = require("express");
const cors = require("cors"); // Importer cors
const mongoose = require("mongoose");

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

//const bodyParser = require("body-parser"); // Importer body-parser pour transformer le corps des requêtes en objet JavaScript utilisable

const app = express();
app.use(express.json()); //pareil que body.parser mais plus simple, suffisant, body-parser est redondant

/*
-CORS signifie « Cross Origin Resource Sharing ». Il s'agit d'un système de sécurité qui, par défaut, 
 bloque les appels HTTP entre des serveurs différents, ce qui empêche donc les requêtes malveillantes 
 d'accéder à des ressources sensibles. Dans notre cas, nous avons deux origines : localhost:3000 et localhost:4200 , 
 et nous souhaiterions qu'elles puissent communiquer entre elles. 
 Pour cela, nous devons ajouter des headers à notre objet  response */

/*Configurer CORS :
-Le CORS définit comment les serveurs et les navigateurs interagissent, en spécifiant quelles ressources peuvent 
 être demandées de manière légitime – par défaut, les requêtes AJAX sont interdites.*/
const corsOptions = {
    origin: "http://localhost:4200", // Autoriser cette origine
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Autoriser ces méthodes HTTP
    allowedHeaders:
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
    optionsSuccessStatus: 200, // Pour que les requêtes préflight renvoient 200 au lieu de 204
};

// Utiliser le middleware cors
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Répondre à toutes les requêtes OPTIONS avec les bons headers

//Connexion à la base de données MongoDB
const uri =
    "mongodb+srv://Aghilas:test@cluster0.zid2flv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};
mongoose
    .connect(uri, clientOptions)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

// Middleware pour gérer les erreurs
app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);
module.exports = app;
