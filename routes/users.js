var express = require('express');
var router = express.Router();
require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');



/* post /signup */
  router.post('/signup', (req, res) => {
    // CONDITION CheckBody ----------------------------------------------
    if (!checkBody(req.body, ['email','password'])) {
      res.json({ result: false, error: 'Email ou mot de passe manquants' });
      return;
    }
    User.findOne({ email: req.body.email }).then(data => {
      // CONDITION email n'existe pas ENCORE
      if (data === null) {
        //alors création du newUser
        const hash = bcrypt.hashSync(req.body.password, 10);
        
        const newUser = new User({
          email: req.body.email,
          password: hash,
          lastName : req.body.lastName,
          firstName : req.body.firstName,
          tels : [{  
          title : req.body.tels,
          num : req.body.tels}],
          token: uid2(32),
        });
        // Push dans la BDD
        newUser.save().then(newDoc => {
          res.json({ result: true, token: newDoc.token });
        });
      } else {
        // User already exists in database
        res.json({ result: false, error: 'l\'email utilisateur existe déjà dans la base' });
      }
    });
    
  })

/* post signin*/
  router.post('/signin', (req, res) => {
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
