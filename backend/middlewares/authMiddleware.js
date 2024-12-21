const asyncErrorHandler = require('../errorHandlers/asyncErrorHandler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const CustomError = require('../errorHandlers/CustomError')
const util = require('util')

const authMiddleware = asyncErrorHandler(async (req, res, next) => {
    // 1. read the token & check if it exist
    const testToken = req.headers.authorization;
    let token;
    if (testToken && testToken.startsWith('bearer')) {
        token = testToken.split(' ')[1]
    }
    if (!token) {
        next(new CustomError('you are not logged in!', 401))
    }

    // 2. validate the token
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR)

    // 3. if the user exists
    const user = await User.findById(decodedToken.id)
    if (!user) {
        const error = new CustomError('the user with the given token does not exist', 401)
        next(error)
    }

    if (await user.isPasswordChanged(decodedToken.iat)) {
        const error = new CustomError('the password has been changed recently, please login again', 401)
        return next(error)
    }

    req.user = user
    next()
})


// const authMiddleware = asyncErrorHandler(async (req, res, next) => {
//     let token;
//     if (req?.headers?.authorization?.startsWith('bearer')) {
//         token = req.headers.authorization.split(" ")[1];
//         try {
//             if (token) {
//                 const decoded = jwt.verify(token, process.env.SECRET_STR)
//                 const user = await User.findById(decoded.id)
//                 req.user = user
//                 next()
//             }
//         } catch (error) {
//             throw new Error("Not authorized")
//         }

//     } else {
//         throw new Error("thereis no token")
//     }
// })


const isAdmin = asyncErrorHandler(async (req, res, next) => {

    const { email } = req.user;
    const adminUser = await User.findOne({ email })
    if (adminUser.role !== "admin") {
        const error = new CustomError('You do not have permission to perform this action', 403)
        next(error)
    } else {
        next()
    }

})

module.exports = { authMiddleware, isAdmin }