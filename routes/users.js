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
      res.json({ result: true, token: data.token,firstName:data.firstName });
    } else {
      res.json({ result: false, error: 'Email introuvable ou mot de passe erroné' });
    }
  });
  })

  // route post pour reset le password

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

  // fonction pour générer un mdp aléatoirement
  function generateRandomPassword() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longueurDuMdp = 8;
    let newMdp = '';

    for(let i = 0; i < longueurDuMdp; i++){
      newMdp += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
    }
    return newMdp;
  }

  // route post permettant d'envoyer un nouveau mot de passe à l'email de l'utilisateur
  router.post('/new-password', (req,res) => {
    //const email = req.body.email; // récupere l'email utilisateur
    const newPassword = generateRandomPassword(); // genere un mdp aléatoire

    // configurer l'envoie de l'email
    const transporteur = nodemailer.createTransport({
      host : 'smtp-mail.outlook.com',
      secureConnection: false,
      port: 587,
      tls: {
        ciphers : "SSLv3"
      },
      auth : {
        user : '', // mettre adresse mail de test&ride
        pass : '',// mettre le mdp de test&ride
      }
    });
    // contenu de l'email
    const mailOptions = {
      from : '',// email de test&ride
      to : 'yihaf35519@wifame.com',// email du receveur
      subject : 'Votre nouveau mot de passe',
      text : `Votre nouveau mot de passe est le suivant : ${newPassword}`
    };
    //envoyer l'email
    transporteur.sendMail(mailOptions, (error, info) => {
      if(error){
        console.log(error);
        res.status(500).send('Erreur lors de l\'envoie de l\'email')
      }else{
        console.log('email envoyé :' + info.response);
        res.status(200).send('Un nouveau mot de passe a été envoyé à votre adresse email.');
      }
    });
  });

module.exports = router;
