const mongoose = require('mongoose');
const  accountSchema = mongoose.Schema({
    customerName : String,
    customerId : String,
    accountId :String,
    balance : Number,
    address:Object,
    email : String,
    createdTime:Date,
    updatedTime: Date
},{versionKey: false})
const account = mongoose.model('accounts',accountSchema)
module.exports = account;