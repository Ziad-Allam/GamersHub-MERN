const User = require('../models/userModel')
const Product = require('../models/productModel')
const Cart = require('../models/cartModel')
const Order = require('../models/orderModel')
const jwt = require('jsonwebtoken')
const CustomError = require('../errorHandlers/CustomError')
const asyncErrorHandler = require('../errorHandlers/asyncErrorHandler')
const sendEmail = require('./emailCtrl')


const loginAdmin = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const err = new CustomError('please provide email and password', 400)
        return next(err)
    }
    const user = await User.findOne({ email }).select('+password');

    if (user.role === "user") {
        const err = new CustomError('Not Authorised', 400)
        return next(err)
    }

    if (!user || !(await user.comparePasswordInDb(password, user.password))) {
        const err = new CustomError('incorrect email or password', 400)
        return next(err)
    }
    const token = jwt.sign({
        id: user._id, role: user.role, email: user.email, firstname: user.firstname, lastname: user.lastname
    }, process.env.SECRET_STR, { expiresIn: "60m" })

    res.cookie("token-admin", token, {
        httpOnly: true,
        secure: false
        // maxAge: 72 * 60 * 60 * 1000
    }).json({
        success: true,
        message: 'logged in successfully',
        data: {
            user: {
                email: user.email,
                role: user.role,
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
            }
        }
    })
})

const logoutAdmin = asyncErrorHandler(async (req, res) => {
    res.clearCookie("token-admin").json({
        success: true,
        message: 'logged out successfully',
    })
});

const authMiddlewareAdmin = async (req, res, next) => {
    const tokenAdmin = req.cookies['token-admin']
    if (!tokenAdmin) return res.status(401).json({
        success: false,
        message: 'Unauthorised user!',
    })

    try {
        const decodeed = jwt.verify(tokenAdmin, process.env.SECRET_STR)
        req.admin = decodeed
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorised user!',
        })
    }
}

module.exports = {
    loginAdmin,
    logoutAdmin,
    authMiddlewareAdmin,
}





















































































































































const getAllUsers = (async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(201).json({
            status: 'success',
            data: {
                users
            }
        })
    } catch (err) {
        const error = new CustomError('err.message', 400)
        next(error)
    }
})

const getUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        const error = new CustomError('User with that ID is not found!', 404)
        return next(error)
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})

const deleteUser = asyncErrorHandler(async (req, res, next) => {

    const deletedUser = await User.findByIdAndDelete(req.params.id)

    if (!deletedUser) {
        const error = new CustomError('User with that ID is not found!', 404)
        return next(error)
    }

    res.status(204).json({
        status: "success",
        data: {
            deletedUser
        }
    })
})