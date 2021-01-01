const User = require("../models/user.model");

const createAdminUser = async () => {
  const userFound = await User.findOne({ email: "alienbyte@gmail.com" });

  if (userFound) return;

  const newUser = new User({
    username: "elfgod",
    email: "alienbyte@gmail.com",
  });

  newUser.password = await newUser.encryptPassword("adminpassword");

  const admin = await newUser.save();

  console.log("Admin user created", admin);
};

module.exports = { createAdminUser };
