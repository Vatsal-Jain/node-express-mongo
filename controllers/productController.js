const products = require("../models/productsSchema");
const moment = require("moment");

exports.getProducts = async (req, res) => {
  try {
    const productData = await products.find();

    res.status(200).json(productData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

exports.addProduct = async (req, res) => {
  const {
    name,
    composition,
    company,
    packing,
    requireprescription,
    mrp,
    price,
    batch,
  } = req.body;
  console.log("prescuotion", requireprescription);
  if (
    !name ||
    !composition ||
    !company ||
    !packing ||
    !requireprescription ||
    !mrp ||
    !price ||
    !batch
  ) {
    res.status(400).json({ error: "All Input is required" });
  }

  try {
    const preProduct = await products.findOne({ name: name });
    if (preProduct) {
      res.status(400).json({ error: "product already exist", status: 400 });
    } else {
      const dateCreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const productData = new products({
        name,
        composition,
        company,
        packing,
        requireprescription,
        mrp,
        price,
        batch,
        datecreated: dateCreate,
      });

      await productData.save();
      res.status(200).json(productData);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProductData = await products.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteProductData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    company,
    composition,
    packing,
    requireprescription,
    mrp,
    price,
    batch,
  } = req.body;
  try {
    const dateUpdate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    const udpateUserData = await products.findByIdAndUpdate(
      { _id: id },
      {
        name,
        company,
        composition,
        packing,
        requireprescription,
        mrp,
        price,
        batch,
        dateUpdated: dateUpdate,
      },
      { new: true }
    );
    await udpateUserData.save();
    res.status(200).json(udpateUserData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

exports.addBatchToProduct = async (req, res) => {
  const { productId } = req.params;
  const { batchNumber, quantity } = req.body;

  try {
    const product = await products.findById(productId);

    // Create a new batch object
    const newBatch = {
      batchNumber,
      quantity,
    };

    // Push the new batch object to the `batch` array
    product.batch.push(newBatch);

    // Save the updated product document
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding batch to product" });
  }
};

exports.updateBatchInProduct = async (req, res) => {
  const { productId } = req.params;
  const { batchId } = req.params;
  const { batchNumber, quantity } = req.body;

  try {
    const product = await products.findById(productId);

    // Find the batch within the product
    const batch = product.batch.id(batchId);

    // Update the batch properties
    batch.batchNumber = batchNumber;
    batch.quantity = quantity;

    // Save the updated product document
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating batch in product" });
  }
};
