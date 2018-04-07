let express = require('express');
let config = require('../config');
let lokiDatabase = require("../" + config.databaseConfig.databaseName);
let loki = require('lokijs');

let lokiDb = new loki(config.databaseConfig.databaseName);
lokiDb.loadDatabase(lokiDatabase);

let router = express.Router();

router.post('/:verticalId', (req, res) => {
	res.setHeader("Content-Type","application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");

	let payload = req.body;
	let verticalId = req.params.verticalId;
	let col = lokiDb.getCollection(config.databaseConfig.employeeKeyName);
	let vCol = lokiDb.getCollection(config.databaseConfig.verticalKeyName);
	if (!col) {
		col = lokiDb.getCollection(config.databaseConfig.employeeKeyName, {
			transactional : true
		});
	}

	if (!payload) {
		res.statusCode = 400;
		res.statusMessage = "Please check payload";

		res.send();
		return;
	}
	let colCount = col.count();
	try {
		let verticalResult = vCol.findOne( { id : parseInt(verticalId,10) });
		if (!verticalResult) {
			res.statusCode = 404;
			res.statusMessage = "Vertical not found";
			res.send();
			return;
		}
		if (!payload.name || !payload.age) {
			throw("Name or age or vertical not found for employee");
		}

		col.insert({
			empId : ++colCount,
			name : payload.name,
			vertical : verticalResult.id,
			verticalName : verticalResult.name,
			age : payload.age
		});
	}
	catch (ex) {
		col.rollback();
		res.statusCode = 400;
		res.statusMessage = ex.message;
		res.send();
		return;
	}
	res.statusCode = 200;
	res.send(col.chain().find({ vertical : verticalId }).data());
	col.commit();
	lokiDb.saveDatabase();
});

router.get('/:verticalId',function(req,res){
	res.setHeader("Content-Type","application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");

	let col = lokiDb.getCollection(config.databaseConfig.employeeKeyName);

	if (!col) {
		res.statusCode = 204;
		res.send([]);
	}
	else {
		res.statusCode = 200;
		res.send(col.chain().find({ vertical : parseInt(req.params.verticalId,10) }).data());
	}
});

router.get('/',function(req,res){
	res.setHeader("Content-Type","application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");

	let col = lokiDb.getCollection(config.databaseConfig.employeeKeyName);

	if (!col) {
		res.statusCode = 204;
		res.send([]);
	}
	else {
		res.statusCode = 200;
		res.send(col.data);
	}
});

module.exports = router;