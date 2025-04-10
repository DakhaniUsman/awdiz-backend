export const Product = (req,res) =>{
    try{
      return res.send("Product Fetched")
    } catch (error){
        res.send(" Error while product api:",error)
    }
}