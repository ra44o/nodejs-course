const router = require('express').Router();
const { toResponse } = require('./user.model');
const usersService = require('./user.service');

const getAllHandler = async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(200).send(users.map(toResponse));
  } catch (error) {
    return next(error);
  }
};

const getByIdHandler = async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.status(200).send(toResponse(user));
  } catch (error) {
    return next(error);
  }
};

const createHandler = async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(200).send(toResponse(user));
  } catch (error) {
    return next(error);
  }
};

const updateHandler = async (req, res, next) => {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);
    res.status(200).send(toResponse(user));
  } catch (error) {
    return next(error);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const user = await usersService.deleteUser(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

router.route('/').get(getAllHandler);
router.route('/:id').get(getByIdHandler);
router.route('/').post(createHandler);
router.route('/:id').put(updateHandler);
router.route('/:id').delete(deleteHandler);

module.exports = router;
