/*
* Copyright 2011-2012 the original author or authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var vertx = require('vertx')
var console = require('vertx/console')
var container = require('vertx/container');

var config = container.config;
//console.log("Yaykuy config:"+JSON.stringify(config));
var server='api.yaykuy.cl';
if(config.server!=null){
  server=config.server;
}
console.log("Connecting to:"+server);

var eb = vertx.eventBus;
var client = vertx.createHttpClient()
  .host(server)  //Should be api.yaykuy.cl but problems with SSL
  .port(443)
  .ssl(true)
  .trustAll(true);
var endpoint = "/";

var busDir;
if(config.address){
	busDir=config.address;
}else{
	busDir="yaykuy"
}


function reply(replier,status,data){
	return replier({
      status  : status,
      data : data
    });
}

load("api_categories/front.js");


