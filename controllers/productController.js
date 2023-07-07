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
  const { name, composition, company, packing } = req.body;
  if (!name || !composition || !company || !packing) {
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
        datecreated: dateCreate,
      });

      await productData.save();
      res.status(200).json(productData);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.userpost = async (req, res) => {
  const { name, email, mobile } = req.body;

  if (!name || !email || !mobile) {
    res.status(400).json({ error: "All Input is required" });
  }
  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      res
        .status(400)
        .json({ error: "Email is Already Registered", status: 400 });
    } else {
      const dateCreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const userData = new users({
        name,
        email,
        mobile,
        datecreated: dateCreate,
      });

      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
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
  const { name, company, composition, packing } = req.body;
  try {
    const udpateUserData = await products.findByIdAndUpdate(
      { _id: id },
      {
        name,
        company,
        composition,
        packing,
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
