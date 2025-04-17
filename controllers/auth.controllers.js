import User from "../models/user.schema.js";
import bcrypt from "bcrypt"

export const Register = async(req, res) => {
    // console.log(req.body);

    try {
        const { name, email, password, confirmPassword } = req.body.user;
        console.log(name, email, password, confirmPassword);

        if (!name || !email || !password || !confirmPassword) {
            return res.json({success : false, message : "All fields are mandatory!"})
        }

        if (password !== confirmPassword) {
            return res.json({success : false, message : "Password did not matched -_-"})
        }

        // const isEmailExist = await User.find({email : email})

        // it is mongoose querry used to find document it always return array of object

        const isEmailExist = await User.findOne({email : email});

        // it is mongoose querry used to find document it returns the first object that matches the condition

        // const isIdExist = await User.findById("67fdfdc4dc918e170c733ca3");

        // console.log(isIdExist,"isIdExist");

        console.log(isEmailExist,"isEmailExist");

        // if (isEmailExist?.length>0){
        //     return res.send("Email already exist *_*")
        // }

        if (isEmailExist){
            return res.json({success : false , message : "Email already exist *_*"})
        }

        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword,"hashedPassword");

        const hasshedConfirmPassword = await    bcrypt.hash(confirmPassword,10);
        console.log(hasshedConfirmPassword,"hasshedConfirmPassword");

        const newUser = User({
            name : name,
            email : email,
            password : hashedPassword,
        });

        // yaha pe humne model schem ko use kiya hia har new user ko track krne ke liye
        console.log(newUser,"newUser")

        const responseFromMongoDB = await newUser.save();
        // this is mongoose features or mongoDB querry used to save data in database since it maybe time consuming so use await at every querry

        console.log(responseFromMongoDB, "responseFromMongoDB")
        return res.json({ success: true, message: "Registration Completed!" });

    } catch (error) {
        res.json({success:false, message : error});
    }

}

export const Login = async(req, res) => {
    try {
        const {email, password} = req.body.userData;

        if (!email || !password){
            return res.json({success: false , message : "All fields are required"})
        }
        console.log(email,"email",password,"password")

        
        const isEmailExist = await User.findOne({email : email});
        
        if(isEmailExist){
        console.log(isEmailExist.password,"isEmailExist.password", password,"password");
        const isPasswordCorrect = await bcrypt.compare(password,isEmailExist.password);
        console.log(isPasswordCorrect);

        if(isPasswordCorrect){
            return res.send({success : true , message : "Login Successfull!"})
        }else {
            return res.json({success  : false , message : "Password not matched"})
        }
        } else{
            return res.json({success : false , message : "Kindly register"})
        }

    } catch (error) {
        res.json({success : false , message : error.data.message})
    }

}