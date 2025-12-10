import {User} from "../modules/user.model.js";

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        // basic validation
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required!"});
        }
        // check if user already exists
        const existingUser = await User.findOne({email: email.toLowerCase()});
        if(existingUser){
            return res.status(409).json({message: "User already exists. Please login."});
        }
        // create new user
        const newUser = await User.create({
            username,
            email: email.toLowerCase(),
            password, // Note: In a real application, make sure to hash the password before saving
            loggedIn: false
        });
        await newUser.save();
        return res.status(201).json({message: "User registered successfully!",
            user: { id: newUser._id, username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

export {registerUser};