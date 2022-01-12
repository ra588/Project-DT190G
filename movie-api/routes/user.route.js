const express = require('express');
const validateBody = require('../middlewares/validateBody');
const requireUser = require('../middlewares/requireUser');
const requireAdmin = require('../middlewares/requireAdmin');
const validateId = require('../middlewares/validateId');

const { createUserSchema, updateUserSchema, loginUserSchema } = require('../schema/user.schema');
const { createUserHandler, getAllUserHandler, getUserHandler, loginUserHandler, updateUserHandler, deleteUserHandler } = require('../controllers/user.controller');

const router = express.Router();

router.get(
  '/',
  requireAdmin,
  getAllUserHandler
);


router.get(
  '/profile',
  requireUser,
  getUserHandler
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  loginUserHandler
)

router.post(
  '/',
  validateBody(createUserSchema),
  createUserHandler
);

router.put(
  '/:userId',
  requireAdmin,
  validateId('userId'),
  validateBody(updateUserSchema),
  updateUserHandler
);

router.delete(
  '/:userId',
  requireAdmin,
  validateId('userId'),
  deleteUserHandler
);

module.exports = router;
