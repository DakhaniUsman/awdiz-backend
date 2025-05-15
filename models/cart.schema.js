import { model, Schema } from "mongoose"

const cartSchema = new cartSchema({
    name : {type : String, required : true},
    price : {type : Number, required : true},
    quantity : {type : Number, required : true},
    category : {type : String, required : true},
    image : {type : String , required : true},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "Users"} 
},{timestamps : true})


const Cart = model("Carts", cartSchema);
export default Cart






















