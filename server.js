
var express = require("express");
var app = express();
var db = require("./databace.js");
var bodyPaser = require("body-parser");
//for validation
const { body, validationResult, param } = require('express-validator');
const { request, response } = require("express");
app.use(bodyPaser.json());
const res = require("express/lib/response");
//defining a variable which is the HTTP_PORT. The port number is 8080. 
let HTTP_PORT = 8000;


app.listen(HTTP_PORT, () => {
    console.log("Server is running on %PORT%".replace("%PORT%", HTTP_PORT))
});

//post and validation
app.post("/api/customer/",
    //Check Email and CardNumber Valid
    body("email").isEmail().normalizeEmail(),
    body("cardNumber").isLength({
        min:12
    }),
    (req, res, next) => {

    //Try Catch For error Handling Part
    try {

        //Validation message send 
        const erro = validationResult(req);

        //If validation is false this 400 error send 
        if (!erro.isEmpty()) {
            return res.status(400).json({
                success: false,
                erro: erro.array()
            });
        }

        const { name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expirytDate,
            cvv,
            timeStamp
        } = req.body;

    //Sql statement
        var sql = 'INSERT INTO customer (name,address,email,dateOfBirth, gender,age,cardHolderName,cardNumber,expirytDate,cvv,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expirytDate, cvv, timeStamp]

     
    //run sql statement, pass parameters, 
        
        db.run(sql, params, function (err, result) {

            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                   
                    "message": "customer " + req.body.name +" has registered" ,
                    "customerid": this.lastID
                })
            }

        });

    } catch (E) {
        res.status(400).send(E);
    }


      
  
});




