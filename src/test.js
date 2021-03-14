const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../server.js")
const { expect } = chai
chai.use(chaiHttp)
let should = chai.should();


describe("test suit", () => {
    it.skip("get call",(done)=>{
        chai.request(app)
        .get("/")
        .end((req,res)=>{
            expect(res.body).to.deep.equals({test:"ok"})
            done()
        })
    })
    it("/create/customer/success", (done) => {
        let reqData = {
            "customerName": "Rajiv2",
            "amount": 5000,
            "email": "rajiv14@gmail.com",
            "address": {
                "line1": "TC 9/4 Old MES colony",
                "postal_code": "110092",
                "city": "New Delhi",
                "state": "Delhi",
                "country": "India"
            }
        }
        chai.request(app)
            .post("/create/customer")
            .send(reqData)
            .end((req, res) => {
                res.should.have.status(200);
                expect(res.body.customerName).to.deep.equals('Rajiv2')
                expect(res.body.status).to.deep.equals('Success')
                done()
            })
    })
    it("/create/customer/existUser", (done) => {
        let reqData = {
            "customerName": "Rajiv",
            "amount": 5000,
            "email": "rajiv4@gmail.com",
            "address": {
                "line1": "TC 9/4 Old MES colony",
                "postal_code": "110092",
                "city": "New Delhi",
                "state": "Delhi",
                "country": "India"
            }
        }
        chai.request(app)
            .post("/create/customer")
            .send(reqData)
            .end((req, res) => {
                res.should.have.status(200);
                expect(res.body.description).to.deep.equals('Already Existing Customer')
                expect(res.body.status).to.deep.equals('Success')
                done()
            })
    })
    it("/create/customer/missingFields", (done) => {
        let reqData = {
            "customerName": "Rajiv",
            "address": {
                "line1": "TC 9/4 Old MES colony",
                "postal_code": "110092",
                "city": "New Delhi",
                "state": "Delhi",
                "country": "India"
            }
        }
        chai.request(app)
            .post("/create/customer")
            .send(reqData)
            .end((req, res) => {
                res.should.have.status(200);
                expect(res.body.description).to.deep.equals('Missing required Fields')
                expect(res.body.status).to.deep.equals('Failure')
                done()
            })
    })
    describe("test suit for account", () => {
        it("/create/account/success", (done) => {
            let reqData = {
                "customerName": "Rajiv2",
                "amount": 5000,
                "email": "rajiv14@gmail.com",
                "address": {
                    "line1": "TC 9/4 Old MES colony",
                    "postal_code": "110092",
                    "city": "New Delhi",
                    "state": "Delhi",
                    "country": "India"
                }
            }
            chai.request(app)
                .post("/create/account")
                .send(reqData)
                .end((req, res) => {
                    res.should.have.status(200);
                    expect(res.body.customerName).to.deep.equals('Rajiv2')
                    expect(res.body.status).to.deep.equals('Success')
                    done()
                })
        })
        it("/create/account/failure", (done) => {
            let reqData = {
                "amount": 5000,
                "address": {
                    "line1": "TC 9/4 Old MES colony",
                    "postal_code": "110092",
                    "city": "New Delhi",
                    "state": "Delhi",
                    "country": "India"
                }
            }
            chai.request(app)
                .post("/create/account")
                .send(reqData)
                .end((req, res) => {
                    res.should.have.status(200);
                    expect(res.body.description).to.deep.equals('Missing required Fields')
                    expect(res.body.status).to.deep.equals('Failure')
                    done()
                })
        })
    })
    describe("test suit for transaction", () => {
        it("/transaction/success", (done) => {
            let reqData = {
                "customerName":"Divya",
                "email":"divya4@gmail.com",
               "fromAccount":"ACC-969eadb5-8ffa-448b-bd93-15bbda44077b",
               "transferedAmount":100,
               "toAccount":"ACC-41314047-2aba-4d01-9eb7-5e2a77f80a25"             
            }
            chai.request(app)
                .post("/transaction")
                .send(reqData)
                .end((req, res) => {
                    //console.log(``)
                    res.should.have.status(200);
                    expect(res.body.accountId).to.deep.equals('ACC-969eadb5-8ffa-448b-bd93-15bbda44077b')
                    expect(res.body.balance).to.deep.equals(4300)
                    expect(res.body.status).to.deep.equals('Success')
                    done()
                })
        })
        it("/transaction/failure", (done) => {
            let reqData = {
                "customerName":"Divya",
                "email":"divya4@gmail.com",
               "transferedAmount":100,
               "toAccount":"ACC-41314047-2aba-4d01-9eb7-5e2a77f80a25"             
            }
            chai.request(app)
                .post("/transaction")
                .send(reqData)
                .end((req, res) => {
                    //console.log(``)
                    res.should.have.status(200);
                    expect(res.body.description).to.deep.equals('Missing required Fields')
                    expect(res.body.status).to.deep.equals('Failure')
                    done()
                })
        })
    })
    describe("test suit for /balance", () => {
        it("/balance/success", (done) => {
            chai.request(app)
                .get('/balance?' + "accountId=ACC-969eadb5-8ffa-448b-bd93-15bbda44077b" )
                .end((req, res) => {
                    console.log(`${JSON.stringify(res)}`)
                    res.should.have.status(200);
                    expect(res.body.accountId).to.deep.equals('ACC-969eadb5-8ffa-448b-bd93-15bbda44077b')
                    expect(res.body.balance).to.deep.equals(4300)
                    expect(res.body.status).to.deep.equals('Success')
                    done()
                })
        })
        it("/balance/failure", (done) => {
            chai.request(app)
                .get('/balance?' + "accountId=ACC-969ead555-8ffa-448b-bd93-15bbda44077b" )
                .end((req, res) => {
                    console.log(`${JSON.stringify(res)}`)
                    res.should.have.status(200);
                    expect(res.body.description).to.deep.equals('Account Not Exist')
                    expect(res.body.status).to.deep.equals('Failure')
                    done()
                })
        })
    })
    describe("test suit for /transaction", () => {
        it("/transaction/success", (done) => {
            chai.request(app)
                .get('/transaction/history?' + "accountId=ACC-969eadb5-8ffa-448b-bd93-15bbda44077b" )
                .end((req, res) => {
                    console.log(`${JSON.stringify(res)}`)
                    res.should.have.status(200);
                    res.body.transactions.should.be.a('array');
                    res.body.transactions.length.should.be.eql(4);
                    expect(res.body.transactions[0].accountId).to.deep.equals('ACC-969eadb5-8ffa-448b-bd93-15bbda44077b')
                    expect(res.body.transactions[0].balance).to.deep.equals(4300)
                    expect(res.body.status).to.deep.equals('Success')
                    done()
                })
        })
        it("/transaction/failure", (done) => {
            chai.request(app)
                .get('/transaction/history?' + "accountId=ACC-969eadb5-000fa-448b-bd93-15bbda44077b" )
                .end((req, res) => {
                    console.log(`${JSON.stringify(res)}`)
                    res.should.have.status(200);
                    expect(res.body.description).to.deep.equals('No Transactions')
                    expect(res.body.status).to.deep.equals('Failure')
                    done()
                })
        })
    })
})

