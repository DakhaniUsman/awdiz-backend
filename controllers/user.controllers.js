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

    const isUserDocumentExist = await Cart.findOne({ userId : userId });
    console.log(isUserDocumentExist,"isUserDocumentExist");
    if (isUserDocumentExist) {
      isUserDocumentExist.productId.push(productId);
      await isUserDocumentExist.save();
    } else {
      const newCarProduct = new Cart({
        userId: userId,
        productId: [productId],
      });
      console.log(newCarProduct, "newCarProduct");
      await newCarProduct.save();
    }


    return res.json({
      success: true,
      message: "Product addded to the cart!"});
  } catch (error) {
    console.log(error,"error")
    return res.send("Error while user api :", error);
  }
};


export const getCartProducts = async(req,res) => {

try {
    const {userId} = req.body;
    console.log(userId,"userId")

  if(!userId){
    return res.json ({ success : false, message : "User Id not found!"});
  }

  const isUserCartExit = await Cart.findOne({userId}).populate("productId");

  console.log(isUserCartExit,"isUserCartExit");

  if(!isUserCartExit){
    return res.json({
      success : true,
      message : "No products found",
      products : []
    })
  } 
  return res.json ({
    success : true,
      message : "Products fetched successfully",
      products : isUserCartExit.productId
  })
} catch (error) {
  console.log(error,"error")
}

}