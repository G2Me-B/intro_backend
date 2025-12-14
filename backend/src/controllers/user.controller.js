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

const loginUser = async (req, res) => {
    try {
        // check if a user with the given email exists
        const {email, password} = req.body;
        
        const user = await User.findOne({email: email.toLowerCase()});

        if(!user){
            return res.status(404).json({message: "User not found. Please register."});
        }

        // compare the provided password with the stored hashed password
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials. Please try again."});
        }
        
        // login successful
        return res.status(200).json({message: "Login successful!",
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
}
export {registerUser,loginUser};