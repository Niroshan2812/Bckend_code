
var sqlite3 = require('sqlite3').verbose();


const DBSOURCE = 'db.sqlite';


//source to create a table and work towards writing an application.
let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error(err.message);
		throw err
	} else {
		console.log("connected to the sqlite db");
		db.run(`CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            address text,
            email text,
            dateOfBirth text,
            gender text,
            age INTEGER,
            cardHolderName text,
            cardNumber INTEGER,
            expirytDate text,
            cvv text,
			timeStamp text
            )`,(err) => {
				if (err) {
					//table alredy created 
					//console.log("testing 2.1");
					
				}
				else {
					//table just created , creating some rows
					var insert = 'INSERT INTO customer(name,address,email,dateOfBirth, gender,age,cardHolderName,cardNumber,expirytDate,cvv,timeStamp ) ';
					db.run(insert, ["A.D.Lakith Dharmasiri", "No 324/A Ra De Mel Road, Colombo", "lakith@gmail.com", "1991.02.25", "female", 28, "A.D.L.Dharmasiri", 102445217895, "12/2022", "246","2022-12-31-23:59:59"]);
					console.log("Creating some row");
				}
			}





		)
	}
})
module.exports = db