export const Product = (req, res) => {
  try {
    return res.send("Product Fetched");
  } catch (error) {
    res.send(" Error while product api:", error);
  }
};

export const AddProduct = (req, res) => {
  try {
    const { name, price, quantity, category, image } = req.body.productData;
    const { userId } = req.body;

    console.log(name, price, quantity, category, image ,"name, price, quantity, category, image")
    console.log(userId,"userId")

    if (!name || !price || !quantity || !category || !image ){
      return res.json({success : false , message : "Failed to Add Product!"})

    }
    return res.json({success : true , message : "Product Has Been Added!"});
  } catch (error) {
    console.log(`Error while creating product : ${error}`);
    return res.json({success : false , message : `Error while creating product : ${error}`});
  }
};
