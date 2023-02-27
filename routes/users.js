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
    User.findOne({ username: req.body.username }).then(data => {
      // CONDITION username n'existe pas ENCORE
      if (data === null) {
        //alors création du newUser
        const hash = bcrypt.hashSync(req.body.password, 10);
        
        const newUser = new User({
          email: req.body.username,
          password: hash,
          token: uid2(32),
        });
        // Push dans la BDD
        newUser.save().then(newDoc => {
          res.json({ result: true, token: newDoc.token });
        });
      } else {
        // User already exists in database
        res.json({ result: false, error: 'l\'utilisateur existe déjà' });
      }
    });
    
  })

/* post signin*/
  router.post('/signin', (req, res) => {
    // CONDITION CheckBody ----------------------------------------------
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  User.findOne({ username: req.body.username }).then(data => {
    // CONDITION username existe BIEN
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token,firstname:data.firstname });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
  });

  // post reset password

  router.post('/reset-password', async (req, res) => {
    try {
      const { email, token, password } = req.body;
  
      const user = await User.findOne({ email, token });
  
      if (!user) {
        return res.status(400).send('Jeton de réinitialisation invalide ou expiré.');
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user.password = hashedPassword;
      user.token = null;
  
      await user.save();
  
      res.status(200).send('Mot de passe réinitialisé avec succès !');
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur s\'est produite lors de la réinitialisation du mot de passe.');
    }
  });

module.exports = router;
