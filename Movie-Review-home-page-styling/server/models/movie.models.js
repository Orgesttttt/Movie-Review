const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [ isEmail, "Please enter a valid email" ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    }
            
},
    { timestamps: true });


UserSchema.virtual('confirmPassword')
.get(() => this.confirmPassword)
.set((value) => this.password = value);

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match');
    }
    next();
})

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
})

module.exports = mongoose.model('User', UserSchema);