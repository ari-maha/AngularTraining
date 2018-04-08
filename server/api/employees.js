let express = require('express');
let config = require('../config');
let lokiDatabase = require("../" + config.databaseConfig.databaseName);
let loki = require('lokijs');

let lokiDb = new loki(config.databaseConfig.databaseName);
lokiDb.loadDatabase(lokiDatabase);

let router = express.Router();

router.post('/:unitId', (req, res) => {
	res.setHeader("Content-Type","application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");

	let payload = req.body;
	let unitId = req.params.unitId;
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
		let unitResult = vCol.findOne( { id : parseInt(unitId,10) });
		if (!unitResult) {
			res.statusCode = 404;
			res.statusMessage = "unit not found";
			res.send();
			return;
		}
		if (!payload.name || !payload.age) {
			throw("Name or age or unit not found for employee");
		}

		col.insert({
			empId : ++colCount,
			name : payload.name,
			unit : unitResult.id,
			unitName : unitResult.name,
			age : payload.age
		});
		unitResult.employeeCount = unitResult.employeeCount + 1;
		vCol.update(unitResult);
	}
	catch (ex) {
		col.rollback();
		vCol.rollback();
		res.statusCode = 400;
		res.statusMessage = ex.message;
		res.send();
		return;
	}
	res.statusCode = 200;
	res.send(col.chain().find({ unit : unitId }).data());
	col.commit();
	vCol.commit();
	lokiDb.saveDatabase();
});

router.get('/:unitId',function(req,res){
	res.setHeader("Content-Type","application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");

	console.log("Employees : Request with id received");

	let col = lokiDb.getCollection(config.databaseConfig.employeeKeyName);

	if (!col) {
		res.statusCode = 204;
		res.send([]);
	}
	else {
		res.statusCode = 200;
		res.send(col.chain().find({ unit : parseInt(req.params.unitId,10) }).data());
	}
});

router.get('/',function(req,res){
	res.setHeader("Content-Type","application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");

	console.log("Employees : Request without id received");

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