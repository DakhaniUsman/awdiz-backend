import User from "../models/user.schema.js";

export const addToCart = async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const { userId } = req.body;
    console.log(userId, "userId");

    if (!userId) {
      return res.json({ success: false, message: "User Id not found!" });
    }
    const { productId } = req.body;

    console.log(productId, "productId");

    if (!productId) {
      return res.json({ success: false, message: "Product Id not found!" });
    }

    const isUserExist = await User.findById(userId);

    console.log(isUserExist, "isUserExist");

    if (!isUserExist) {
      return res.json({ success: false, message: "User not found!" });
    }

    const isProductExist = await User.findById(userId);

    console.log(isProductExist, "isProductExist");
    if (!isProductExist) {
      return res.json({ success: false, message: "Product not found!:" });
    }

    return res.send("Welcome User!");
  } catch (error) {
    return res.send("Error while user api :", error);
  }
};
