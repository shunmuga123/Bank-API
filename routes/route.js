let Actions = require("../actions/action.js")
let ApiRoutes = function (app) {
    this.server = app.server
    this.routeObj = new Actions(app)

}
module.exports = ApiRoutes
ApiRoutes.prototype.init = function () {
    var self = this
    self.server.get("/", (req, res) => {
        res.send({ test: "ok" })
    })
    self.server.post("/create/customer", (req, res) => {
        let request = req.body
        console.log(`${JSON.stringify(request)} request data`)
        self.routeObj.createCustomer(request)
            .then((result) => {
                res.send(result)
            })
    })
    self.server.post("/create/account", (req, res) => {
        let request = req.body
        console.log(`${JSON.stringify(request)} request data`)
        self.routeObj.createAccount(request)
            .then((result) => {
                res.send(result)
            })
    })
    self.server.post("/transaction", (req, res) => {
        let request = req.body
        console.log(`${JSON.stringify(request)} request data`)
        self.routeObj.transaction(request)
            .then((result) => {
                res.send(result)
            })
    })
    self.server.get("/balance", (req, res) => {
        let request = req.query
        console.log(`${JSON.stringify(request)} request data ${JSON.stringify(req.params)}`)
        self.routeObj.getBalance(request)
            .then((result) => {
                res.send(result)
            })
    })
    self.server.get("/transaction/history", (req, res) => {
        let request = req.query
        console.log(`${JSON.stringify(request)} request data`)
        self.routeObj.transactionHistory(request)
            .then((result) => {
                res.send(result)
            })
    })
}