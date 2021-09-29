const User = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`There was a ${req.method} request at ${req.originalUrl} at ${Date.now}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const { id } = req.params;
    const possibleUser = await User.getById(id);
    if(possibleUser) {
      req.user = possibleUser
      next()
    } else {
      next({ status: 404, message: "user not found"})
    }

  } catch (err) { 
    next(err)
  }
}

async function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try {
    const { name } = req.body;
    if(!name) {
      next({status:400, message: "missing required name field"})
    } else {
      next();
    }

  } catch (err) {
    next(err)
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

function errorHandling (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  })
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  errorHandling,
  validateUser,
}