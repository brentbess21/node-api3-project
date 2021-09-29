const User = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp  = new Date().toLocaleString();
  console.log(`There was a ${req.method} request at ${req.originalUrl} at ${timeStamp}`)
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

async function validatePost(req, res, next) {
  // DO YOUR MAGIC
  try {
    const { text } = req.body;
    if(!text) {
      next({status: 400, message: "missing required text field"})
    } else {
      next()
    }
  } catch (err) {
    next(err);
  }
  
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
  validatePost
}