const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).send(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const users = await usersService.getById(req.params.id);
  res.status(200).send(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.createUser(req.body);
  res.status(201).send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.deleteUser(req.params.id);
  res.status(204).send(user);
});

module.exports = router;
