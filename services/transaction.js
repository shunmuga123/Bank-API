const mongoose = require('mongoose');
const  transactionSchema = mongoose.Schema({
    customerName : String,
    customerId : String,
    accountId :String,
    transactionId : String,
    fromAccount:String,
    transferedAmount:Number,
    toAccount:String,
    balance:Number,
    transferType:{ type: String, default: "IMPS" },
    createdTime:Date,
    updatedTime: Date
},{versionKey: false})
const transacton = mongoose.model('transactions',transactionSchema)
module.exports = transacton;