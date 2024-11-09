const { v4: uuidv4 } = require('uuid');

const expenses = [];

function getAll() {
  return expenses;
}

function getById(id) {
  return expenses.find((expense) => expense.id === id);
}

function create(name) {
  const expense = { id: uuidv4(), name };

  expenses.push(expense);

  return expense;
}

function deleteById(id) {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return;
  }

  const [deletedExpense] = expenses.splice(index, 1);

  return deletedExpense;
}

function update({ id, name }) {
  const expensetoUpdate = expenses.find((expense) => expense.id === id);

  if (!expensetoUpdate) {
    return;
  }

  return Object.assign(expensetoUpdate, { name });
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
