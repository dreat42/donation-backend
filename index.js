require('./src/models/User');
require('./src/models/feedback');
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');

const requireAuth = require('./src/middlewares/requireAuth');
const requestRouter = require('./src/routes/requestRoute');
const feedback = require('./src/routes/feedback');


const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(requestRouter);
app.use(feedback);
const port = process.env.PORT || 5000;

const mongoUri = process.env.ATLAS_URI;
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`,
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
