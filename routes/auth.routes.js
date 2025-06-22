// const express = require("express");
// const { register, login } = require("../controllers/authController");

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;




const express = require("express");
const { register, login } = require("../controllers/authController");
const { registerValidation, loginValidation, runValidation } = require("../validators/authValidator");

const router = express.Router();

router.post("/register", registerValidation, runValidation, register);
router.post("/login", loginValidation, runValidation, login);

module.exports = router;
