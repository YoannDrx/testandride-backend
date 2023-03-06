require('../models/feedbacks');
require('../models/connection');
var express = require('express');
var router = express.Router();

/* Route Post pour envoyer les feedbacks à la base de données */

router.post('/feedbacks', (req, res) => {
  try {
    const newFeedback = new Feedback({
      responses: req.body.responses,
      author: req.body.author
    });
    const savedFeedback = newFeedback.save().then(savedFeedback => {
      res.json('Feedback enregistré');
      
    }).catch(error => {
      console.error(error);
      res.json('Une erreur s\'est produite lors de l\'enregistrement.');
    });

    // Push dans la BDD
    newFeedback.save().then(newDoc => {
      res.json({ result: true, token: newDoc.token });
    });
  } catch (error) {
    console.error(error);
    res.json('Une erreur s\'est produite lors de l\'enregistrement.');
  }
});

module.exports = router;
