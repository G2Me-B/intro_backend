import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true,lowercase: true, trim: true, minlength: 3, maxlength: 30},
    email:{type: String, required: true, unique: true,minlength: 5, maxlength: 50,lowercase: true, trim: true},
    password:{type: String, required: true, minlength: 8, maxlength: 1024},
    
},{
    timestamps: true
})

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model('User', userSchema);