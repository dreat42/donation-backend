const router = require('express').Router();

let Request = require('../models/feedback.js');

router.route('/getfeedback').get((req, res) => {
  Request.find()
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/feedback').post((req, res) => {
  const email = req.body.email;

  const feedback = req.body.feedback;

  const newRequest = new Request({
    feedback,

    email,
  });
  newRequest.save();
  try {
    res.json('Request added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
