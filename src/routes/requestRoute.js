const router = require('express').Router();

let Request = require('../models/RequestForm.js');

router.route('/displayreq').get((req, res) => {
  Request.find()
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/request').post((req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const description = req.body.description;
  const email = req.body.email;
  const upi = req.body.upi;
  const fundraised = Number(req.body.fundraised);

  const fundrequired = Number(req.body.fundrequired);

  const newRequest = new Request({
    username,
    title,
    description,
    fundrequired,
    fundraised,
    upi,
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
