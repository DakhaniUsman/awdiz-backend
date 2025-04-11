export const Users = (req,res) => {
    try{
        return res.send("Welcome User!")
    } catch(error){
        return res.send("Error while user api :", error)
    }
}