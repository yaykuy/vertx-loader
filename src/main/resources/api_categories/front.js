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

//Front category http://api.yaykuy.cl/#fronthaciausuarios

/*
 * /prices
 *
 * Precios de compra y venta de BTC en CLP
 *
 * Salida:
 	{ 
   "buy_BTC_CLP"  : (precio de compra en CLP por un BTC)
   "sell_BTC_CLP" : (precio de venta en CLP de un BTC)
   "ask_USD_BTC"  : (precio referencial de oferta)
   "bid_USD_BTC"  : (precio referencial de demanda)
   "USD_CLP"      : (precio referencial de un USD en CLP)
   "current_fee"  : (porcentaje de margen cobrado, solo informativo)
	}
 *
 */

eb.registerHandler(busDir+'.prices', prices);

function prices (message, replier) {
	var request   = client.request('GET', endpoint+'/prices', gotResponse);
    request.end();

	function gotResponse (response) {
	    if (response.statusCode() != 200) {
	      reply(replier,'error','Status Code = '+response.statusCode());
	    } else {
	      response.bodyHandler(readBody);
	    }
	}

	function readBody (body) {
	    try {
	      var b = JSON.parse(body.toString());
	      if (b.error) {
	        return reply(replier,'error', JSON.stringify(b.error));
	      } else {
	        return reply(replier,'ok', b);
	      }
	    } catch (e) {
	      return reply(replier,'error', e.toString());
	    }
  	}

  	

}
