const router = require('express').Router();

let Request = require('../models/RequestForm.js');

router.route('/displayreq/:id').post((req, res) => {
  Request.findById(req.params.id)
    .then(request => {
      request.fundraised = Number(req.body.fundraised);

      request
        .save()
        .then(() => res.json('fundraised updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


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
  const image = req.body.image;
  

  const fundrequired = Number(req.body.fundrequired);


  const newRequest = new Request({
    username,
    title,
    description,
    fundrequired,
    fundraised,
    upi,
    email,
    image,
  });
  newRequest.save();
  try {
    res.json('Request added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
