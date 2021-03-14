const mongoose = require('mongoose');
const  customerSchema = mongoose.Schema({
    customerName : String,
    customerId : String,
    accountId :String,
    balance : Number,
    address:Object,
    email : String,
    createdTime:Date,
    updatedTime: Date
},{versionKey: false})
const customer = mongoose.model('customers',customerSchema)
module.exports = customer;

