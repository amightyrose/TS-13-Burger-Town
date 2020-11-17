// Import MySQL connection.
const connection = require("../config/connection.js");


// Function to create a string of question marks. Takes the value of vals.length from the insertOne function.
const printQuestionMarks = (num) => {
	const arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}


// Helper function to convert object key/value pairs to SQL syntax.
const objToSql = (obj) => {

	const arrValues = [];

	// loop through the keys and push the key/value as a string into arrValues
	for (let key in obj) {

		let value = obj[key];

		// check to skip hidden properties
		if (Object.hasOwnProperty.call(obj, key)) {
			// if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
			if (typeof value === "string" && value.indexOf(" ") >= 0) {
				value = "'" + value + "'";
			}
			arrValues.push(key + "=" + value);
		}

	}

	// translate array of strings to a single comma-separated string
	return arrValues.toString();

}


// Object for all our SQL statement functions.
const orm = {
	selectAll(tableInput, callback) {
		const queryString = "SELECT * FROM " + tableInput + ";";
		connection.query(queryString, function (err, result) {
			if (err) {
				throw err;
			}
			callback(result);
		});
	},
	insertOne(table, cols, vals, callback) {
		let queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		console.log(queryString);

		connection.query(queryString, vals, function (err, result) {
			if (err) {
				throw err;
			}

			callback(result);
		});
	},
	updateOne(table, objColVals, condition, callback) {
		let queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);
		connection.query(queryString, function (err, result) {
			if (err) {
				throw err;
			}

			callback(result);
		});
	}
};


// Export the orm object.
module.exports = orm;
