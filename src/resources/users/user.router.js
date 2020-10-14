const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { logger } = require('../../common/logger/logger');

const getAllHandler = async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).send(users.map(User.toResponse));
};

const getByIdHandler = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.status(200).send(User.toResponse(user));
};

const createHandler = async (req, res) => {
  const user = await usersService.createUser(req.body);
  res.status(200).send(User.toResponse(user));
};

const updateHandler = async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  res.status(200).send(User.toResponse(user));
};

const deleteHandler = async (req, res) => {
  const user = await usersService.deleteUser(req.params.id);
  res.status(200).send(user);
};

router.route('/').get(logger, getAllHandler);
router.route('/:id').get(logger, getByIdHandler);
router.route('/').post(logger, createHandler);
router.route('/:id').put(logger, updateHandler);
router.route('/:id').delete(logger, deleteHandler);

module.exports = router;
