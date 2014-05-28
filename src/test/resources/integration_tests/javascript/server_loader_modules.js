var container = require("vertx/container")
var vertx = require("vertx");
var vertxTests = require("vertx_tests");
var vassert = require("vertx_assert");
var console = require("vertx/console");

var eb = vertx.eventBus;



function testNoAppConfig(){
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), null, function(err, depID) {
		vassert.assertEquals("appConfig Null",err.getMessage())
		vassert.testComplete();	
	});
}

function testNoModules(){
	var config = {"appConfig": {}};
	
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	});
}

function testEmptyModules(){
	var config = 
	{
			"appConfig": {
				"modules" : {}
			}
	};
	
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	});
}

function testWrongModules(){
	var config = 
	{
			"appConfig": {
				"modules" : true
			}
	};
	
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertEquals("modules malformed",err.getMessage())
		vassert.testComplete();	
	});
}

function testModules(){
	var config = 
	{
			"appConfig": {
				"modules" : {
					"mongo_0": {
						"module"	: "io.vertx~mod-mongo-persistor~2.0.0-final"
					}
				}
			}
	};
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	})
}

function testModules2(){
	var config = 
	{
			"appConfig": {
				"modules" : {
					"mongo_0": {
						"module"	: "io.vertx~mod-mongo-persistor~2.0.0-final"
					},
					"mongo_1": {
						"module"	: "io.vertx~mod-mongo-persistor~2.0.0-final"
					}
				}
			}
	};
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	})
}

function testModules1y1(){
	var config = 
	{
			"appConfig": {
				"modules" : {
					"mongo_0": {
						"module"	: "io.vertx~mod-mongo-persistor~2.0.0-final"
					},
					"mongo_1malo": {
						"module"	: "malo"
					}
				}
			}
	};
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertEquals(err.getMessage(),"Invalid module identifier: malo. Should be of form owner~name~version");
		vassert.testComplete();	
	})
}



var script = this;
vertxTests.startTests(script);



