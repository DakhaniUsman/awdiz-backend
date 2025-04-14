export const Product = (req,res) =>{
    try{
      return res.send("Product Fetched")
    } catch (error){
        res.send(" Error while product api:",error)
    }
}

export const CreateProduct = (req,res) => {
  try{
    return res.send("Product Has Been Created!")
  } catch (error){
    console.log(`Error while creating product : ${error}`)
  }
}