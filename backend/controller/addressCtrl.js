const Address = require('../models/address')

const getAddresses = async (req, res) => {
    try {

        const { userId } = req.params

        if (!userId) {
            res.status(400).json({
                success: false,
                message: 'User id is required'
            })
        }

        const addressList = await Address.find({ userId })

        res.status(200).json({
            success: true,
            data: {
                addressList
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const addAddress = async (req, res) => {
    try {

        const {
            userId,
            fullName,
            streetName,
            buildingNo,
            city,
            phone,
            landmark
        } = req.body

        if (!userId || !fullName || !streetName || !buildingNo || !city || !phone || !landmark) {
            res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }

        const newAddress = new Address({
            userId, fullName, streetName, buildingNo, city, phone, landmark
        })

        await newAddress.save();

        res.status(201).json({
            success: true,
            data: {
                newAddress
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const editAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params
        const formData = req.body

        if (!userId || !addressId) {
            res.status(400).json({
                success: false,
                message: 'User and address id are required'
            })
        }

        const address = await Address.findOneAndUpdate({
            _id: addressId,
            userId
        },
            formData,
            { new: true }
        )

        if (!address) {
            return res.status(400).json({
                success: false,
                message: 'Address not found!'
            })
        }

        res.status(200).json({
            success: true,
            data: {
                address
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const deleteAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params

        if (!userId || !addressId) {
            res.status(400).json({
                success: false,
                message: 'User and address id are required'
            })
        }

        const address = await Address.findOneAndDelete({
            _id: addressId,
            userId
        })

        if (!address) {
            return res.status(400).json({
                success: false,
                message: 'Address not found!'
            })
        }

        res.status(200).json({
            success: true,
            address: 'Address deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

module.exports = {
    getAddresses,
    addAddress,
    editAddress,
    deleteAddress,
}