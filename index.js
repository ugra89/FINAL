const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticate } = require('./middleware');
require('dotenv').config();

const server = express();
server.use(express.json());
server.use(cors());

const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'exam_schema',
};

const userSchema = Joi.object({
  firstName: Joi.string().lowercase().required(),
  lastName: Joi.string().lowercase().required(),
  age: Joi.number().integer().min(1).max(100).required(),
  email: Joi.string().email().trim().lowercase().required(),
});

const dbPool = mysql.createPool(mysqlConfig).promise();

server.get('/', (req, res) => {
  res.send('loged in!');
  const encryptedPassword = bcrypt.hash(payload.password, '123');
});
server.get('/guests', (req, res) => {
  res.send(guests);
});

server.post('/register-user', async (req, res) => {
  let payload = req.body;
  try {
    payload = await userSchema.validateAsync(payload);
  } catch (error) {
    console.error(error);

    return res.status(400).send({ error: 'All fields are required' });
  }
  try {
    await dbPool.execute(
      `
        INSERT INTO guests (firstName, lastName, age, email)
        VALUES (?,?,?,?)`,
      [payload.firstName, payload.lastName, payload.age, payload.email]
    );
    res.status(201).json({ message: 'Guest added succesfuly.' });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
  //   const newGuest = {
  //     guest: {
  //       firstName: payload.firstName,
  //       lastName: ,
  //       email: ,
  //       age: ,
  //     },
  //     user: payload.user,
  //   };
  //   guests.push(newGuest);
  //   );
});

server.put('/guests/:id', (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  const updatedGuest = guests.find((guest) => guest.user === id);

  if (updatedGuest) {
    updatedGuest.guest = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      age: payload.age,
    };
    updatedGuest.user = payload.user;
    res.status(200).json({ message: 'Guest data is updated.' });
  } else {
    res.status(404).json({ message: 'Guest not found.' });
  }
});

server.listen(process.env.PORT, () =>
  console.log(`server is running on Port ${process.env.PORT}`)
);
