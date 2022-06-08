const bcrypt = require("bcrypt");
const db = require("../models");
const Tutorial = db.tutorials;
const User = require('../models/user.model')
exports.signUp = async (req, res) => {
    // Validation
    // const errors = validationResult(req);

    // if (!errors.isEmpty())
    //     return res.status(422).json(validation(errors.array()));

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email.toLowerCase() });

        // Check the user email
        if (user)
            return res
                .status(422)
                .json({ msg: "Email already registered" });

        let newUser = new User({
            email: email.toLowerCase().replace(/\s+/, ""),
            password,
        });

        // Hash the password
        const hash = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, hash);

        // Save the user
        await newUser.save();

        // If the requirement above pass
        // Lets send the response with JWT token in it


                res
                    .status(200)
                    .json({message: "Register success, please fill details of your account."});
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: "Server error"});
        }
};

exports.logIn = async (req, res) =>{
    //validation

    // const errors = validationResult(req);

    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email });

        // Check the email
        // If there's not exists
        // Throw the error
        if (!user) return res.status(422).json({message: "Invalid credentials"});

        // Check the password
        let checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword)
            return res.status(422).json({message: "Invalid credentials"});
                res
                    .status(200)
                    .json({data: user});

    } catch (err) {
        console.log(err.message);
        res.status(500).json({message:"Server error"});
    }
}


exports.logout = async(req,res) =>{

    try{

        const user = await User.findByIdAndUpdate(req.user.id, {status: false})

        res
        .status(200)
        .json(success("Logout", res.statusCode));

    }catch(e){
        res.status(500).json(error("Server error", res.statusCode));
    }
}