const mongoose = require('mongoose');
const customerModel = require("./customer.js")
const accountModel = require("./account.js")
const transactonModel = require("./transaction")
let ApiService = function(app){
}
module.exports = ApiService
ApiService.prototype.createCustomer = function(data){
    return new Promise((resolve,rejecct) =>{
        let newModel = new customerModel()
        newModel.customerName = data.customerName
        newModel.customerId = data.customerId
        newModel.accountId = data.accountId
        newModel.balance = data.balance
        newModel.address = data.address
        newModel.email = data.email
        newModel.createdTime = new Date()
        newModel.updatedTime = new Date()
        console.log(`data in action ${JSON.stringify(data)}`)
        newModel.save()
        .then((res)=>{
            console.log(`saved result ${res}`)
            resolve(res)

        })
        .catch((e)=>{
            console.log(`err saved result ${e}`)
            rejecct(e)
        })
    })
}

ApiService.prototype.checkCustomerExist = function(data){
    return new Promise((resolve,reject)=>{
        console.log("Customer Exist flow")
        customerModel.findOne({customerName:data.customerName})
        .then((result)=>{
            console.log(`${result} getuser details`)
            resolve(result)
        })
        .catch((e)=>{
            reject(e)
        })
    })
}

ApiService.prototype.createAccount = function(data){
    return new Promise((resolve,rejecct) =>{
        let newModel = new accountModel()
        newModel.customerName = data.customerName
        newModel.customerId = data.customerId
        newModel.accountId = data.accountId
        newModel.balance = data.balance
        newModel.address = data.address
        newModel.email = data.email
        newModel.createdTime = new Date()
        newModel.updatedTime = new Date()
        console.log(`data in action ${JSON.stringify(data)}`)
        newModel.save()
        .then((res)=>{
            console.log(`account saved result ${res}`)
            resolve(res)

        })
        .catch((e)=>{
            console.log(`err in account saved result ${e}`)
            rejecct(e)
        })
    })
}

ApiService.prototype.getAccount = function(data){
    return new Promise((resolve,reject)=>{
        console.log("getAccount flow")
        accountModel.findOne({accountId:data})
        .then((result)=>{
            console.log(`${result} getAccount details`)
            resolve(result)
        })
        .catch((e)=>{
            reject(e)
        })
    })
}
ApiService.prototype.updateAccount = function(data){
    return new Promise((resolve,reject)=>{
        console.log("updateAccount flow")
        accountModel.update({accountId:data.accountId},{$set:{balance:data.balance}},{upsert:true})
        .then((result)=>{
            console.log(`${result} update account details`)
            resolve(result)
        })
        .catch((e)=>{
            reject(e)
        })
    })
}
ApiService.prototype.saveTransaction = function(data){
    return new Promise((resolve,rejecct) =>{
        let newModel = new transactonModel()
        newModel.customerName = data.customerName
        newModel.fromAccount = data.fromAccount
        newModel.accountId = data.fromAccount
        newModel.toAccount = data.toAccount
        newModel.balance = data.balance
        newModel.transferedAmount = data.transferedAmount
        newModel.transactionId = data.transactionId
        newModel.createdTime = new Date()
        newModel.updatedTime = new Date()
        console.log(`data in action ${JSON.stringify(data)}`)
        newModel.save()
        .then((res)=>{
            console.log(`transaction saved result ${res}`)
            resolve(res)

        })
        .catch((e)=>{
            console.log(`err in transaction saved result ${e}`)
            rejecct(e)
        })
    })
}