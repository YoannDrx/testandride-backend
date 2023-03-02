var express = require("express");
var router = express.Router();
require("../models/connection");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

// *** CRUD OPERATIONS ***

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Get one user
router.get("/:token", async (req, res) => {
    try {
        const user = await User.findOne({token :req.params.token});
        res.json(user);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Create a new user
router.post("/create", async (req, res) => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            tels: req.body.tels,
            token: uid2(32),
        });
        await user.save();
        res.json({ result: true, message: `Utilisateur créé` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Update a user
router.put("/update/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.email = req.body.email;
        user.password = req.body.password;
        user.lastName = req.body.lastName;
        user.firstName = req.body.firstName;
        user.tels = req.body.tels;

        await user.save();
        res.json({ result: true, message: `Utilisateur modifié` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Delete a user
router.delete("/delete/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.remove();
        res.json({ result: true, message: `Utilisateur supprimé` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});


// *** CUSTOM ROUTES : Signin / Signup ***


// route post pour signup
router.post("/signup", (req, res) => {
    // CONDITION CheckBody ----------------------------------------------
    if (!checkBody(req.body, ["email", "password"])) {
        res.json({ result: false, error: "Email ou mot de passe manquants" });
        return;
    }
    User.findOne({ email: req.body.email }).then((data) => {
        // CONDITION email n'existe pas ENCORE
        if (data === null) {
            //alors création du newUser
            const hash = bcrypt.hashSync(req.body.password, 10);

            const newUser = new User({
                email: req.body.email,
                password: hash,
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                tels: req.body.tels,
                token: uid2(32),
            });
            // Push dans la BDD
            newUser.save().then((newDoc) => {
                res.json({ result: true, token: newDoc.token });
            });
        } else {
            // User already exists in database
            res.json({ result: false, error: "l'email utilisateur existe déjà dans la base" });
        }
    });
});

// route post pour signin
router.post("/signin", (req, res) => {
    // CONDITION CheckBody ----------------------------------------------
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Email ou mot de passe manquants' });
    return;
  }
  User.findOne({ email: req.body.email }).then(data => {
    // CONDITION username existe BIEN
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'Email introuvable ou mot de passe erroné' });
    }
  });
  })

// route post pour reset le password sur la page profil utilisateur
router.post('/switch-password', async (req,res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await User.findOne({token : req.body.token});
    if(user){
      console.log(user)
      await User.updateOne({token : req.body.token} , {password : hashedPassword})
      res.json({result : true , message: "Mot de passe changé !"})
    }else{
      res.json({result: false , error: "Impossible de changer de mot de passe."})
    }
    }catch (error){
    res.json("Une erreur s\'est produite lors du changement de mot de passe.")
  }
})

module.exports = router;
