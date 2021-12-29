import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';

// jwt auth stuff
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const accessTokenSecret = 'bigpinkelephant';

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
}
app.use(cors(corsOptions));

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use(async (req, res, next) => {
  req.context = {
    models,
    jwt,
    accessTokenSecret,
  };
  next();
});

// * Routes * //

// app.use('/session', routes.session);
// app.use('/messages', routes.message);

app.use('/users', routes.user);
app.use('/lessons', routes.lessons);
app.use('/login', routes.login);
app.use('/pupils', routes.pupils);
app.use('/notices', routes.notices);
app.use('/register', routes.register);

// * Start * //

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

// * Database Seeding * //
// include takes an array of objects

const createUsersWithMessages = async () => {
  console.log('database seeding ....');
  await models.User.create(
    {
      username: 'guest',
      email: 'guest@localhost',
      password: 'secret',
    },
  );

  await models.User.create(
    {
      username: 'admin',
      email: 'admin@localhost',
      password: 'secretinfo',
    }
  );

  await models.Lesson.create(
    {
      name: "Beginner Group Guitar",
      frequency: "Weekly",
      date: "2021-05-24 12:00 Mo",
      duration: 30,
      venue: "Rehearsal Room",
      pupils: [
        {
          "firstname": "Herman",
          "lastname": "Melville",
        }
      ],
      notices: [
        {
          "content": "C major chord",
        }
      ]
    },
    {
      include: [
        {model: models.Pupil},
        {model: models.Notice},
      ],
    }
  );

  await models.Lesson.create(
    {
      name: "Circular Breathing",
      frequency: "Weekly",
      date: "2021-05-25 14:00 Tu",
      duration: 30,
      venue: "Escape Room",
    },
    {
      include: [models.Pupil],
    },
  );

  await models.Lesson.create(
    {
      name: "Yoga",
      frequency: "Weekly",
      date: "2021-05-26 19:30 We",
      duration: 30,
      venue: "Empty Room",
      pupils: [
        {
          "firstname": "Amadeus",
          "lastname": "Falco",
        }
      ]    
    },
    {
      include: [models.Pupil],
    },
  );

  await models.Lesson.create(
    {
      name: "Coffee Break",
      frequency: "Weekly",
      date: "2021-05-27 17:00 Th",
      duration: 30,
      venue: "Teachers Room",    
    },
    {
      include: [models.Pupil],
    },
  );

  await models.Lesson.create(
    {
      name: "Group reflection",
      frequency: "Weekly",
      date: "2021-05-28 20:00 Fr",
      duration: 30,
      venue: "Arena",
      pupils: [
        {
          "firstname": "Herman",
          "lastname": "Melville",
        },
        {
          "firstname": "Johann Wolfgang",
          "lastname": "Mozart",
        },
        {
          "firstname": "Amadeus",
          "lastname": "Falco",
        },
        {
          "firstname": "Karl",
          "lastname": "Valentin",
        },
        {
          "firstname": "Joan",
          "lastname": "Osborne",
        }
      ],          
    },
    {
      include: [models.Pupil],
    },
  );

};
