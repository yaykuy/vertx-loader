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
				"modules:" : {}
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
				"modules:" : true
			}
	};
	
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	});
}




var script = this;
vertxTests.startTests(script);



