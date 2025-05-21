import Cart from "../models/cart.schema.js";
import Product from "../models/product.schema.js";
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

    const isProductExist = await Product.findById(productId);

    console.log(isProductExist, "isProductExist");
    if (!isProductExist) {
      return res.json({ success: false, message: "Product not found!:" });
    }

    // const isUserDocumentExist = await Cart.findOne({ userId : userId });
    // console.log(isUserDocumentExist,"isUserDocumentExist");
    // if (isUserDocumentExist) {
    //   isUserDocumentExist.productId.push(productId);
    //   await isUserDocumentExist.save();
    // } else {
    //   const newCarProduct = new Cart({
    //     userId: userId,
    //     productId: [productId],
    //   });
    //   console.log(newCarProduct, "newCarProduct");
    //   await newCarProduct.save();
    // }

    const cartData = await Cart.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { productId: productId } },
      { new: true, upsert: true }
    );

    console.log(cartData, "cartData");

    return res.json({
      cartData: cartData,
      success: true,
      message: "Product addded to the cart!",
    });
  } catch (error) {
    console.log(error, "error");
    return res.send("Error while user api :", error);
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId, "userId");

    if (!userId) {
      return res.json({ success: false, message: "User Id not found!" });
    }

    const isUserCartExit = await Cart.findOne({ userId }).populate("productId");

    console.log(isUserCartExit, "isUserCartExit");

    if (!isUserCartExit) {
      return res.json({
        success: true,
        message: "No products found",
        products: [],
      });
    }



    let totalPrice = 0;

    for (let i = 0; i < isUserCartExit.productId.length; i ++){
      totalPrice += isUserCartExit.productId[i].price;
    }
    console.log(totalPrice, "totalPrice");  

    return res.json({
      success: true,
      message: "Products fetched successfully",
      products: isUserCartExit.productId,
      totalPrice : totalPrice,
    });
  } catch (error) {
    console.log(error, "error");
  }
};

export const removeCartProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log(userId, productId, "userId, productId");

    if (!userId) {
      return res.json({ success: false, message: "User Id not found!" });
    }
    const isUserExist = await User.findById(userId);
    console.log(isUserExist, "isUserExist");
    if (!isUserExist) {
      return res.json({ success: false, message: "User not found!" });
    }

    console.log(productId, "productId");
    if (!productId) {
      return res.json({ success: false, message: "Product Id not found!" });
    }

    const isProductExist = await Cart.findOne({ productId: productId });
    console.log(isProductExist, "isProductExist");
    if (!isProductExist) {
      return res.json({ success: false, message: "Product not found!" });
    }
    const isUserCartExit = await Cart.findOne({ userId: userId });
    if (!isUserCartExit) {
      return res.json({ success: false, message: "No products found!" });
    }
    console.log(isUserCartExit, "isUserCartExit");

    const removedProduct = await Cart.findOneAndUpdate(
      { userId: userId },
      { $pull: { productId: productId } },
      { new: true }
    );
    console.log(removedProduct, "removedProduct");

    if (!removedProduct) {
      return res.json({ success: false, message: "Product not removed!" });
    }

    return res.json({ success: true, message: "Product removed from cart!" });
  } catch (error) {
    console.log(error, "error");
    res.json({
      success: false,
      mesage: "Error while removing product from cart!",
    });
  }
};
