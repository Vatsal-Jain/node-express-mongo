const admin = require("firebase-admin");
const credentials = require("../serviceAccountKey.json");

const firebaseusers = require("../models/firebaseUserSchema");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

exports.firebaseSignup = async (req, res) => {
  const { email, password, name, mobileNumber } = req.body;
  try {
    const userResponse = await admin
      .auth()
      .createUser({
        email: email,
        password: password,
        emailVerified: false,
        disabled: false,
      })
      .then((userCredential) => {
        const userData = new firebaseusers({
          name,
          email,
          mobileNumber,
        });

        userData.save().then(() => {
          res
            .status(200)
            .json({ message: "user success created", userCredential });
        });
      });
  } catch (err) {
    res.status(400).json(err);
  }
};
