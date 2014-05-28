var container = require("vertx/container")
var vertx = require("vertx");
var vertxTests = require("vertx_tests");
var vassert = require("vertx_assert");
var console = require("vertx/console");

var eb = vertx.eventBus;




function testNoServerVerticles(){
	var config = {"appConfig": {}};
	
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	});
}

function testEmptyServerVerticles(){
	var config = 
	{
			"appConfig": {
				"serverVerticle" : ""
			}
	};
	
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	});
}

function testWrongServerVerticles(){
	var config = 
	{
			"appConfig": {
				"serverVerticle" : true
			}
	};
	
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertEquals("serverVerticle malformed",err.getMessage())
		vassert.testComplete();	
	});
}

function testServerVerticles(){
	var config = 
	{
			"appConfig": {
				"serverVerticle" : "some0"
			}
	};
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	})
}

function testServerVerticlesFile(){
	var config = 
	{
			"appConfig": {
				"serverVerticle" : "server"
			},
			"server" : {
				"file" : "cl.yaykuy.loader.test.integration.java.SomeVerticle"
			}
	};
	container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, function(err, depID) {
		vassert.assertNull(err);
		vassert.testComplete();	
	})
}



var script = this;
vertxTests.startTests(script);



