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

load("config_vars.js");

var container = require("vertx/container")
var vertx = require("vertx");
var vertxTests = require("vertx_tests");
var vassert = require("vertx_assert");
var console = require("vertx/console");

var eb = vertx.eventBus;

function testBuyNoToken()   {
  eb.send('test_yaykuy.buy', {}, function(reply) {
      //console.log("_testBuyNoToken reply:"+JSON.stringify(reply,null,4));
      vassert.assertEquals('error', reply.status);
      vassert.assertEquals('missing token', reply.data);
      vassert.testComplete();
    });
}

function testBuyInvalidToken()   {
  var data=buyData;
  data.token='aaaaa'
  eb.send('test_yaykuy.buy',  data , function(reply) {
      //console.log("_testBuyInvalidToken reply:"+JSON.stringify(reply,null,4));
      vassert.assertEquals('ok', reply.status);
      vassert.assertEquals('error', reply.data.status);
      vassert.assertEquals('Token inválido', reply.data.message);
      vassert.testComplete();
    });
}

function testBuy()   {
  eb.send('test_yaykuy.prices', {'token': testToken}, function(reply) {
    var data=buyData;
    data.buy_BTC_CLP=reply.data.buy_BTC_CLP;
    console.log("testBuy send:"+JSON.stringify(data,null,4));

    eb.send('test_yaykuy.buy',data, function(reply) {
        console.log("testBuy reply:"+JSON.stringify(reply,null,4));
        vassert.assertEquals('ok', reply.status);
        vassert.assertEquals('ok', reply.data.status);
        vassert.assertEquals('no problem', reply.data.message);
        vassert.assertTrue(reply.data.amount_CLP > 0);
        vassert.assertNotNull(reply.data.yky_code);
        vassert.testComplete();
      });
  });
}

var script = this;

var config = { "address": "test_yaykuy" }
container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, 1, function(err, depID) {
    vertxTests.startTests(script);
});
