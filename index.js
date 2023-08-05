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

const guestSchema = Joi.object({
  firstName: Joi.string().lowercase().required(),
  lastName: Joi.string().lowercase().required(),
  age: Joi.number().integer().min(1).max(100).required(),
  email: Joi.string().email().trim().lowercase().required(),
});

const userSchema = Joi.object({
  name: Joi.string().lowercase().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

const dbPool = mysql.createPool(mysqlConfig).promise();

server.get('/', authenticate, (req, res) => {
  console.log(req.user);
  res.status(200).send('loged in!');
});

server.post('/register', async (req, res) => {
  let payload = req.body;

  try {
    payload = await userSchema.validateAsync(payload);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const [result] = await dbPool.execute(
      `
              INSERT INTO user (name, email, password)
              VALUES (?,?,?)`,
      [payload.name, payload.email, hashedPassword]
    );
    const userId = result.insertId;

    res.status(201).json({ message: 'User added succesfuly.', userId });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

server.post('/login', async (req, res) => {
  let payload = req.body;

  try {
    payload = await userSchema.validateAsync(payload);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: 'All fields are required' });
  }
  try {
    const [data] = await dbPool.execute(
      `
            SELECT * FROM user
           WHERE email=?
            `,
      [payload.email]
    );
    if (!data.length) {
      return res
        .status(400)
        .send({ error: 'Email or password did not match 1' });
    }
    const isPasswordMatching = await bcrypt.compare(
      payload.password,
      data[0].password
    );

    console.log(isPasswordMatching);

    if (isPasswordMatching) {
      const token = jwt.sign(
        {
          email: data[0].email,
          id: data[0].id,
        },
        process.env.JWT_SECRET
      );

      return res.status(200).send({ token });
    }
    return res.status(400).send({ error: 'Email or password did not match 2' });
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

server.get('/guests', authenticate, async (req, res) => {
  const userId = req.user.id;
  try {
    const [data] = await dbPool.execute(
      `
            SELECT * FROM guests
            WHERE user_id=?
            `,
      [userId]
    );
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

server.post('/register-user', authenticate, async (req, res) => {
  let payload = req.body;

  try {
    payload = await guestSchema.validateAsync(payload);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const [result] = await dbPool.execute(
      `
          INSERT INTO guests (firstName, lastName, age, email, user_id)
          VALUES (?,?,?,?,?)`,
      [
        payload.firstName,
        payload.lastName,
        payload.age,
        payload.email,
        req.user.id,
      ]
    );
    res.status(201).json({ message: 'Guest added succesfuly.' });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

server.put('/guests/:id', async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  const [result] = await dbPool.execute(
    `
        SELECT * FROM guests
        WHERE id = ?
      `,
    [id]
  );

  const updatedGuest = result[0];

  if (updatedGuest) {
    updatedGuest['firstName'] = payload.firstName;
    updatedGuest['lastName'] = payload.lastName;
    updatedGuest['age'] = payload.age;
    updatedGuest['email'] = payload.email;
    console.log('Atnaujinimo užklausa:', updatedGuest);
    res.status(200).json({ message: 'Guest data is updated.' });
  } else {
    res.status(404).json({ message: 'Guest not found.' });
  }
});

server.listen(process.env.PORT, () =>
  console.log(`server is running on Port ${process.env.PORT}`)
);
