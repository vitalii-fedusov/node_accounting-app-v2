const { Router } = require('express');
const expensesService = require('../services/expenses.service');

const expensesRouter = Router();

expensesRouter.get('/', async (req, res) => {
  const expenses = await expensesService.getAll();

  res.json(expenses);
});

expensesRouter.post('/', (req, res) => {});
expensesRouter.delete('/:id', (req, res) => {});
expensesRouter.put('/:id', (req, res) => {});

module.exports = {
  expensesRouter,
};
