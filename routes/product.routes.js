// const express = require("express");
// const { createProduct, getProducts } = require("../controllers/productController");
// const router = express.Router();

// router.post("/", createProduct);
// router.get("/", getProducts);

// module.exports = router;




const express = require("express");
const { createProduct, getProducts } = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getProducts);
router.post("/", verifyToken, isAdmin, createProduct); // Only admin can create

module.exports = router;
