export const Register = (req, res) => {
    console.log(req.body.user);

    try {
        const { name, email, password, confirmPassword} = req.body.user;

        if (!name || !email || !password || !confirmPassword){
          return res.send("All fields are mandatory...")
        }

        if (password !== confirmPassword){
          return res.send("Password did not matched -_-")
        }
        res.json({"succes":true,"message":"Registration Completed!"});

    } catch (error) {
        res.send("error while regster api :",error)
    }

}

export const Login = (req,res) => {
try{
    return res.send("Login Successfull!")
} catch (error) {
    res.send("error while login api :",error)
}

}