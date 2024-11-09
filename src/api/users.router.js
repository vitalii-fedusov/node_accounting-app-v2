const { Router } = require('express');
const usersService = require('../services/users.service');
const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const name = req.body.title;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
});

usersRouter.delete('/', async (req, res) => {
  const user = await usersService.getById(req.body.id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.deleteById(req.body.id);

  res.status(204).json(user);
});

usersRouter.delete('/:id', (req, res) => {});
usersRouter.put('/:id', (req, res) => {});

module.exports = {
  usersRouter,
};
