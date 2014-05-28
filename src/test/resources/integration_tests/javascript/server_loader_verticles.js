var container = require("vertx/container")
var vertx = require("vertx");
var vertxTests = require("vertx_tests");
var vassert = require("vertx_assert");
var console = require("vertx/console");

var eb = vertx.eventBus;




function testNoVerticles(){
	var config = {"appConfig": {}};
	
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	});
}

function testEmptyVerticles(){
	var config = 
	{
			"appConfig": {
				"verticles" : {}
			}
	};
	
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	});
}

function testWrongVerticles(){
	var config = 
	{
			"appConfig": {
				"verticles" : true
			}
	};
	
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertEquals("verticles malformed",err.getMessage())
		vassert.testComplete();	
	});
}

function testVerticles(){
	var config = 
	{
			"appConfig": {
				"verticles" : {
					"some": {}
				}
			}
	};
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	})
}

function testVerticles2(){
	var config = 
	{
			"appConfig": {
				"verticles" : {
					"some0": {},
					"some1": {}
				}
			}
	};
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	})
}

function testVerticles1y1(){
	var config = 
	{
			"appConfig": {
				"verticles" : {
					"some0": {},
					"some1_malo": malo
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



