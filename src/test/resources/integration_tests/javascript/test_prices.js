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

var testToken = "fd4493a2-f82a-4196-b347-d9667011b56b"

var container = require("vertx/container")
var vertx = require("vertx");
var vertxTests = require("vertx_tests");
var vassert = require("vertx_assert");
var console = require("vertx/console");

var eb = vertx.eventBus;

function _testPricesNoToken()   {
  eb.send('test_yaykuy.prices', {}, function(reply) {
      //console.log("testPricesNoToken reply:"+JSON.stringify(reply,null,4));
      vassert.assertEquals('error', reply.status);
      vassert.assertEquals('missing token', reply.data);
      vassert.testComplete();
    });
}

function _testPricesInvalidToken()   {
  eb.send('test_yaykuy.prices', {'token': 'aaaaaaa'}, function(reply) {
      //console.log("testPricesInvalidToken reply:"+JSON.stringify(reply,null,4));
      vassert.assertEquals('error', reply.status);
      vassert.assertEquals('Status Code = 500', reply.data);
      vassert.testComplete();
    });
}

function testPrices()   {
  eb.send('test_yaykuy.prices', {'token': testToken}, function(reply) {
      //console.log("testPricesInvalidToken reply:"+JSON.stringify(reply,null,4));
      vassert.assertEquals('ok', reply.status);
      vassert.assertEquals('ok', reply.data.status);
      vassert.assertTrue(reply.data.buy_BTC_CLP > 0);
      vassert.assertTrue(reply.data.sell_BTC_CLP > 0);
      vassert.assertTrue(reply.data.ask_USD_BTC > 0);
      vassert.assertTrue(reply.data.bid_USD_BTC > 0);
      vassert.testComplete();
    });
}

var script = this;

var config = { "address": "test_yaykuy" }
container.deployModule(java.lang.System.getProperty("vertx.modulename"), config, 1, function(err, depID) {
    vertxTests.startTests(script);
});
