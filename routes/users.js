var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync(req.body.password, 10);
const User = require ('../models/user')

//  route post pour reset le mot de passe
router.post('/reset-password', async (req, res) => {
  const {token, password} = req.body;
  const user = await User.findOne({ token });

  if (!user){
    res.json ({error : 'invalid token'})
  }
  const hash = bcrypt.hashSync(req.body.password, 10);
  const newUser = new User ({
    email : req.body.email,
    password : hash,
    token : uid2 (32),
  });
  //hacher le nouveau mdp
  const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // mise à jour du mdp
    user.password = hashedPassword;
    user.token = null;
    await user.save();

    res.json('Mot de passe réinitialiser ! ')
});

module.exports = router;
