const { Router } = require('express');
const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const expensesRouter = Router();

expensesRouter.get('/', async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await expensesService.getAll(userId, categories, from, to);

  res.json(expenses);
});

expensesRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).json(expense);
});

expensesRouter.post('/', async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.sendStatus(400);
  }

  if (!usersService.getById(userId)) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expense);
});

expensesRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.deleteById(id);

  res.sendStatus(204);
});

expensesRouter.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await usersService.update(id, req.body);

  res.json(updatedExpense);
});

module.exports = {
  expensesRouter,
};
