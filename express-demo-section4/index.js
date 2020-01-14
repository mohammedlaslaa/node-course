const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home');
const Joi = require("joi");
const logger = require('./middleware/logger');
const express = require("express");
const app = express();


app.set('view engine', 'pug');
app.set('views', './views');

require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());
app.use(logger);
app.use(helmet());
app.use('/api/courses', courses)
app.use('/', home)
// Configuration

// console.log('Application Name : ' + config.get('name'))
// console.log('Mail server : ' + config.get('mail.host'))
// console.log('Mail password : ' + config.get('mail.password'))

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan Enabled...')
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
