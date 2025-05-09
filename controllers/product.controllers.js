import User from "../models/user.schema.js";
import Product from "../models/product.schema.js";

export const getProduct = (req, res) => {
  try {
    return res.send("Product Fetched");
  } catch (error) {
    res.send(" Error while product api:", error);
  }
};

export const AddProduct = async(req, res) => {
  try {
    const { name, price, quantity, category, image } = req.body.productData;
    const { userId } = req.body;

    const isUserExist = await User.findById(userId);
    console.log(isUserExist,"isUserExist")

    if(!isUserExist){
      return res.json({
        success : false , message : "User not found!"
      })
    }

    if(isUserExist?.role !== "seller"){
      return res.json({ success : false , message : "You do not have access to add products."})
    }



    console.log(name, price, quantity, category, image ,"name, price, quantity, category, image")
    console.log(userId,"userId")

    if (!name || !price || !quantity || !category || !image ){
      return res.json({success : false , message : "Failed to Add Product!"})

    }
    const newProduct = Product({
      name, price, quantity, category, image, userId
    })

    console.log(newProduct,"newProduct");

    await newProduct.save()
    return res.json({success : true , message : "Product Has Been Added!"});
  } catch (error) {
    console.log(`Error while creating product : ${error}`);
    return res.json({success : false , message : `Error while creating product : ${error}`});
  }
};


export const AddedProduct = async(req,res)=> {

  const {userId} = req.body;

  if(!userId){
    return res.json({ success  : false , message : "User Id not found!"})
  }
  const products = await Product.find({ userId : userId});

  console.log(products,"products")

  if (products){
    return res.json ({ success : true , message : "Products fetched" , productData : { products : products}})
  }

  return res.json ({success : false , message : "Error while getting added products!"})
}

export const SingleProduct = async(req,res) => {

  const {userId} = req.body;

  if(!userId){
    return res.json ({success : false , message : "User Id not found"})
  }

  




}