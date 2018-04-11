let express = require('express');
let config = require('../config');
let lokiDatabase = require("../" + config.databaseConfig.databaseName);
let loki = require('lokijs');

let lokiDb = new loki(config.databaseConfig.databaseName);
lokiDb.loadDatabase(lokiDatabase);

let router = express.Router();

router.post('/', (req, res) => {
	res.setHeader("Content-Type","application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");

	let payload = req.body;
	let col = lokiDb.getCollection(config.databaseConfig.verticalKeyName);

	if (!col) {
		col = lokiDb.getCollection(config.databaseConfig.verticalKeyName, {
			transactional : true
		});
	}

	if (!payload) {
		res.statusCode = 400;
		res.statusMessage = "Payload is incorrect";

		res.send();
		return;
	}
	let colCount = col.count();
	try {
		if (!payload.name) {
			throw("Name not found for unit");
		}
		col.insert({
			id : ++colCount,
			name : payload.name,
			description : payload.description ? payload.description : "",
			employeeCount : 0
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
	res.send(col.data);
	col.commit();
	lokiDb.saveDatabase();
});

router.get('/',function(req,res){
	res.setHeader("Content-Type","application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");

	let col = lokiDb.getCollection(config.databaseConfig.verticalKeyName);

	if (!col) {
		res.statusCode = 204;
		res.send([]);
	}
	else {
		res.statusCode = 200;
		res.send(col.data);
	}
});

router.get('/:id',function(req,res){
	res.setHeader("Content-Type","application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	
	let col = lokiDb.getCollection(config.databaseConfig.verticalKeyName);
	let statusCode = 200;

	let resultSet = col.chain().find( { id : parseInt(req.params.id,10)}).data();

	if (!resultSet) {
		statusCode = 204;
	}
	res.statusCode = statusCode;
	res.send(resultSet);
});

router.post('/:id',function(req,res){
	res.setHeader("Content-Type","application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	
	let payload = req.body;

	let col = lokiDb.getCollection(config.databaseConfig.verticalKeyName);
	let verticalColumn = col.findOne(id);

	if (!verticalColumn) {
		res.statusCode = 404;
		res.send();
		return;
	}
	verticalColumn["description"] = payload["description"];
	col.update(verticalColumn);
	res.statusCode = 200;
	res.send(col.data);
	col.commit();
	lokiDb.saveDatabase();
});

module.exports = router;