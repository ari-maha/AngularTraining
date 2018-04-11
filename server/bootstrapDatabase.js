let config = require('./config');
let loki = require('lokijs');

let lokiDb = new loki(config.databaseConfig.databaseName);

let vCol = lokiDb.addCollection( config.databaseConfig.verticalKeyName , {
    transactional : true
});

vCol.insert([{
    id : 1,
    name : "BFSI",
    description : "banking and finance",
    employeeCount : 2
}, {
    id : 2,
    name : "Retail",
    description : "Retail related clients",
    employeeCount : 2
}]);

vCol.commit();

let eCol = lokiDb.addCollection( config.databaseConfig.employeeKeyName, {
    transactional : true
});

eCol.insert([{
    empId : 1,
    name : "Dennis Ritchie",
    unit : 1,
    unitName : "BFSI",
    age : 30
}, {
    empId : 2,
    name : "Brian Kernighan",
    unit : 1,
    unitName : "BFSI",
    age : 25
}, {
    empId : 3,
    name : "James Gosling",
    unit : 2,
    unitName : "Retail",
    age : 24
}, {
    empId : 4,
    name : "Guido van Rossum",
    unit : 2,
    unitName : "Retail",
    age : 22
}]);

eCol.commit();

lokiDb.saveDatabase();