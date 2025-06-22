const { check, validationResult } = require("express-validator");

// Validation rules
exports.registerValidation = [
  check("name", "Name is required").notEmpty(),
  check("email", "Invalid email").isEmail(),
  check("password", "Password must be 6+ chars").isLength({ min: 6 }),
];

exports.loginValidation = [
  check("email", "Invalid email").isEmail(),
  check("password", "Password required").notEmpty(),
];

// Middleware to handle validation errors
exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};
