const express = require("express");
const cors = require("cors"); // Importer cors
const bodyParser = require("body-parser"); // Importer body-parser

const app = express();

// Configurer CORS
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

const mongoose = require("mongoose");

//IMPORTER LE MODELE THING
const Thing = require("./models/Things.js");

const uri =
    "mongodb+srv://Aghilas:test@cluster0.zid2flv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};

app.use(express.json()); //pareil que body.parser mais plus simple

//cette deconnexion automatique faut supprimer car après ping le Post ça suprimer sans recpetion de reponse
async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // Ensures that the client will close when you finish/error
        // await mongoose.disconnect();
    }
}
run().catch(console.dir);

// mongoose
//     .connect(
//         "mongodb+srv://aghilas:test@cluster0.zid2flv.mongodb.net/things?retryWrites=true&w=majority",
//         { useNewUrlParser: true, useUnifiedTopology: true }
//     )
//     .then(() => console.log("Connexion à MongoDB réussie !"))
//     .catch(() => console.log("Connexion à MongoDB échouée !"));

//accès au corps d ela requette
//ce middleware intercepte qui ont un content type json , met a disposition le corps de la requete sous forme d'objet javascript, dans req.body

//ajout de middleware CORS
//Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS), des headers spécifiques de contrôle d'accès doivent être précisés pour tous vos objets de réponse.
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*"); //accès origine tout le mode
//     res.setHeader(
//         "Access-Control-Allow-Headers", //on autorise les entêtes suivants
//         "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods", //on autorise les méthodes suivants
//         "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     );
//     next();
// });

//REQUETTE POST POUR ENREGISTRER UN OBJET
app.use(bodyParser.json());

app.post("/api/stuff", (req, res, next) => {
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
        .catch((error) => res.status(400).json({ error }));

    //modele pour tester le server avec nodemon en console et postman
    // console.log(req.body); //pas de bdd , donc aps moyen d'enregistrer les données, on va juster lguer les données reçues
    // res.status(201).json({
    //     message: "Objet créé !",
    // });
});

app.use("/api/stuff", (req, res, next) => {
    Thing.find()
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
