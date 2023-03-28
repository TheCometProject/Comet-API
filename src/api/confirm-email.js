const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/confirm-email/:confirmationToken', async (req, res) => {

      const { confirmationToken } = req.params;

      // find user with matching confirmation token
      const user = await User.findOne({ confirmationToken: confirmationToken });

      if (!user) {
            return res.status(400).send('Invalid confirmation token');
      }

      user.confirmationToken = undefined;
      user.isEmailConfirmed = true;
      await user.save();

      res.status(200).send('Email confirmed successfully');

});

module.exports = router;