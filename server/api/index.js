let express = require('express');
let config = require('../config');
let lokiDatabase = require("../" + config.databaseConfig.databaseName);
let loki = require('lokijs');

let lokiDb = new loki(config.databaseConfig.databaseName);
lokiDb.loadDatabase(lokiDatabase);

function sendResponse(response, newObject) {
    setTimeout(() => {
        if (newObject) {
            response.send(newObject);
        }
        else {
            response.send();
        }
    }, 2000);
}

function getEmployeeRouter() {
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

            sendResponse(res, null);
            return;
        }
        let colCount = col.count();
        try {
            let unitResult = vCol.findOne( { id : parseInt(unitId,10) });
            if (!unitResult) {
                res.statusCode = 404;
                res.statusMessage = "unit not found";
                sendResponse(res, null);
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
            sendResponse(res, null);
            return;
        }
        col.commit();
        vCol.commit();
        res.statusCode = 200;
        sendResponse(res,col.chain().find({ unit : parseInt(unitId,10) }).data());
        lokiDb.saveDatabase();
    });

    router.get('/:unitId',function(req,res){
        res.setHeader("Content-Type","application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");


        let col = lokiDb.getCollection(config.databaseConfig.employeeKeyName);

        if (!col) {
            res.statusCode = 204;
            sendResponse(res,[]);
        }
        else {
            res.statusCode = 200;
            sendResponse(res,col.chain().find({ unit : parseInt(req.params.unitId,10) }).data());
        }
    });

    router.get('/',function(req,res){
        res.setHeader("Content-Type","application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");


        let col = lokiDb.getCollection(config.databaseConfig.employeeKeyName);

        if (!col) {
            res.statusCode = 204;
            sendResponse(res,[]);
        }
        else {
            res.statusCode = 200;
            sendResponse(res,col.data);
        }
    });

    return router;
}

function getUnitRouter() {
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

            sendResponse(res, null);
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
            
            sendResponse(res, null);
            return;
        }
        res.statusCode = 200;
        sendResponse(res, col.data);
        col.commit();
        lokiDb.saveDatabase();
    });

    router.get('/',function(req,res){
        res.setHeader("Content-Type","application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        let col = lokiDb.getCollection(config.databaseConfig.verticalKeyName);

        if (!col) {
            res.statusCode = 204;
            sendResponse(res, []);
        }
        else {
            res.statusCode = 200;
            sendResponse(res, col.data);
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
        sendResponse(res, resultSet);
    });

    router.post('/:id',function(req,res){
        res.setHeader("Content-Type","application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        
        let payload = req.body;

        let col = lokiDb.getCollection(config.databaseConfig.verticalKeyName);
        let verticalColumn = col.findOne(id);

        if (!verticalColumn) {
            res.statusCode = 404;
            sendResponse(res, null);
            return;
        }
        verticalColumn["description"] = payload["description"];
        col.update(verticalColumn);
        res.statusCode = 200;
        sendResponse(res, col.data);
        col.commit();
        lokiDb.saveDatabase();
    });

    return router;
}

module.exports = {
    unit : getUnitRouter(),
    employee : getEmployeeRouter()
}