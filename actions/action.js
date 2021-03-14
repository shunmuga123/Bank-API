let Service = require("../services/accountService.js")
const { v4: uuidv4 } = require('uuid');
const accountModel = require("../services/account.js")
const transactonModel = require("../services/transaction")
let ApiAction = function (app) {
  this.serviceObj = new Service(app)
}
module.exports = ApiAction

ApiAction.prototype.createCustomer = async function (request) {
  var self = this
  let response = {}
  if (request && request.email && request.amount && request.customerName) {
    let checkExist = await self.serviceObj.checkCustomerExist(request)
    if (checkExist && checkExist.customerName && checkExist.email) {
      response["description"] = "Already Existing Customer"
      response["status"] = "Success"
      return response
    }
    else {
      let uniqId = await uuidv4();
      let customId = await uuidv4()
      response["customerName"] = request.customerName
      response["email"] = request.email
      response["address"] = request.address
      response["customerId"] = "CUS-" + customId
      response["accountId"] = "ACC-" + uniqId
      response["balance"] = request.amount
      console.log(`final response ${response}`)
      const customerService = await self.serviceObj.createCustomer(response)
      const accountService = await self.serviceObj.createAccount(response)
      response["status"] = "Success"
      return response
    }
  }
  else {
    response["status"] = "Failure"
    response["description"] = "Missing required Fields"
    return response
  }

}
ApiAction.prototype.createAccount = async function (request) {
  var self = this
  let response = {}
  if (request && request.email && request.amount && request.customerName) {
    let checkExist = await self.serviceObj.checkCustomerExist(request)
    console.log("Customer Id", checkExist.customerId)
    let uniqId = await uuidv4();
    response["customerName"] = request.customerName
    response["email"] = request.email
    response["address"] = request.address
    response["customerId"] = checkExist && checkExist.customerId
    response["accountId"] = "ACC-" + uniqId
    response["balance"] = request.amount
    console.log(`final response ${response}`)
    const accountService = await self.serviceObj.createAccount(response)
    response["status"] = "Success"
    return response
  }
  else {
    response["status"] = "Failure"
    response["description"] = "Missing required Fields"
    return response
  }
}
ApiAction.prototype.transaction = async function (request) {
  var self = this
  let response = {}
  if (request && request.fromAccount && request.toAccount) {
    let uniqId = await uuidv4();
    let fromAccount = await self.serviceObj.getAccount(request.fromAccount)
    let toAccount = await self.serviceObj.getAccount(request.toAccount)
    let updateFrom = {
      balance: fromAccount.balance - request.transferedAmount,
      accountId: request.fromAccount
    }
    let updateTo = {
      balance: toAccount.balance + request.transferedAmount,
      accountId: request.toAccount
    }

    let fromAccountUpdate = await self.serviceObj.updateAccount(updateFrom)
    let toAccountUpdate = await self.serviceObj.updateAccount(updateTo)
    response["customerName"] = request.customerName
    response["accountId"] = request.fromAccount
    response["fromAccount"] = request.fromAccount
    response["toAccount"] = request.toAccount
    response["transferedAmount"] = request.transferedAmount
    response["balance"] = updateFrom.balance
    response["transactionId"] = "TXN-" + uniqId
    console.log(`trans details ${response}`)
    let saveTransaction = await self.serviceObj.saveTransaction(response)
    if (saveTransaction) {
      response["status"] = "Success"
      return response

    }
    else {
      response["status"] = "Failure"
      response["description"] = "No saved Transaction"
      return response
    }
  }
  else {
    response["status"] = "Failure"
    response["description"] = "Missing required Fields"
    return response
  }
}
ApiAction.prototype.getBalance = async function (request) {
  let response = {}
  let criteria = { accountId: request.accountId }
  let balanceData = await accountModel.findOne(criteria)
  console.log(`balance of ${balanceData}`)
  if (balanceData && balanceData.balance) {
    console.log(`bal of data ${balanceData.customerName}`)
    response["balance"] = balanceData.balance
    response["status"] = "Success"
    response["accountId"] = request.accountId
  }
  else {
    response["status"] = "Failure"
    response["description"] = "Account Not Exist"
  }

  return response
}
ApiAction.prototype.transactionHistory = async function (request) {
  let response = {}
  let criteria = { accountId: request.accountId }
  let transactionsData = await transactonModel.find(criteria).sort({ _id: -1 })
  console.log(`transactions of ${transactionsData}`)
  if (transactionsData && transactionsData.length>0) {
    console.log(`transactions arr data ${transactionsData}`)
    response["transactions"] = transactionsData
    response["status"] = "Success"
    response["accountId"] = request.accountIds
  }
  else {
    response["status"] = "Failure"
    response["description"] = "No Transactions"
    response["accountId"] = request.accountId

  }

  return response
}