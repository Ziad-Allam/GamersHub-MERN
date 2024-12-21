const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'please enter your first name.']
    },
    lastname: {
        type: String,
        required: [true, 'please enter your last name.']
    },
    email: {
        type: String,
        required: [true, 'please enetr an email'],
        unique: true,
        lowercase: true
    },
    mobile: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: Array,
        default: [],
    },
    refreshToken: {
        type: String
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
    next()
})

userSchema.methods.comparePasswordInDb = async function (pswd, pswdDB) {
    return await bcrypt.compare(pswd, pswdDB)
}

userSchema.methods.createResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000
    console.log(resetToken, this.passwordResetToken)
    return resetToken
}



userSchema.methods.isPasswordChanged = async function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const pswdChangedTimestamp = this.passwordChangedAt.getTime() / 1000
        // if JWTTimestamp less than pswdChangedTimestamp, that means the password was changed after the JWT was issued
        return JWTTimestamp < pswdChangedTimestamp
    }
    return false
}

module.exports = mongoose.model('User', userSchema)