const Cart = require("../models/cartSchema");
const Product = require("../models/productsSchema");
const moment = require("moment");

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error retrieving cart,maybe there is no element in cart",
    });
  }
};

exports.addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If cart doesn't exist, create a new cart for the user
      cart = new Cart({ user: userId });
    }

    // Find the product in the cart
    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (cartItem) {
      const product = await Product.findById(productId);
      console.log("product alreayd esixs upgrading quantity");
      // If the product is already in the cart, update the quantity
      cartItem.quantity += quantity;
      cartItem.totalPrice = cartItem.quantity * product.price;
    } else {
      // If the product is not in the cart, add it as a new item
      const product = await Product.findById(productId);

      if (product.requireprescription) {
        // Check if the product requires a prescription
        cart.prescription = true;
      }
      const totalPrice = product.price * quantity;
      cart.items.push({ product: productId, quantity, totalPrice });
    }

    // Recalculate the total price of the cart
    cart.totalCartValue = calculateCartTotalPrice(cart.items);

    // Save the updated cart document
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding to cart" });
  }
};

const calculateCartTotalPrice = (items) => {
  let total = 0;

  for (const item of items) {
    total += item.totalPrice;
  }

  return total;
};
