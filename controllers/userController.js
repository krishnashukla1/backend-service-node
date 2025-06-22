const User = require("../models/user.model");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

//Custom Error Example

// if (!user) {
//   const error = new Error("User not found");
//   error.statusCode = 404;
//   return next(error); // Pass to error handler
// }

