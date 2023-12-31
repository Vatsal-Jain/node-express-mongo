const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers");
const firebaseControllers = require("../controllers/firebaseController");
const productControllers = require("../controllers/productController");
const cartControllers = require("../controllers/cartControllers");

// routes

router.post("/user/register", controllers.userpost);
router.get("/user/getSearchUser", controllers.getSearchUsers);
router.get("/user/getAllUsers", controllers.getAllUsers);
router.get("/user/singleuser/:id", controllers.getSingleUser);
router.delete("/user/deleteuser/:id", controllers.deleteUser);
router.put("/user/updateuser/:id", controllers.updateUser);

router.post("/signup", firebaseControllers.firebaseSignup);

router.post("/addproduct", productControllers.addProduct);
router.get("/getallproducts", productControllers.getProducts);
router.delete("/deleteproduct/:id", productControllers.deleteProduct);
router.put("/updateproduct/:id", productControllers.updateProduct);
router.post("/addnewbatch/:productId", productControllers.addBatchToProduct);
router.put(
  "/products/:productId/batches/:batchId",
  productControllers.updateBatchInProduct
);

router.get("/cart/:userId", cartControllers.getCart);
router.post("/cart/:userId/add", cartControllers.addToCart);
module.exports = router;
