const orm = require("../config/orm.js");

const burger = {
	selectAll(callback) {
		orm.selectAll("burgers", function (res) {
			callback(res);
		});
	},
	insertOne(cols, vals, callback) {
		orm.insertOne("burgers", cols, vals, function (res) {
			callback(res);
		});
	},
	updateOne(objColVals, condition, callback) {
		orm.updateOne("burgers", objColVals, condition, function (res) {
			callback(res);
		});
	},
};

// Export the model.
module.exports = burger;
