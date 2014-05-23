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

eb.registerHandler(busDir+'.prices', doPrices);

function doPrices (message, replier) {
	var token = message.token;
	if(token==null || token == ''){
		return reply(replier,'error','missing token');
	}

	var request   = client.request('GET', endpoint+'/prices?token='+token, gotResponse);
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

/*
 * /buy
 *
 * Permite ingresar ordenes de compra de BTC con CLP. Usuario tiene CLP y quiere
darselos a yaykuy a cambio de BTC.

Entrada:

     {
      "token"      : (token de autenticacion)
      "amount_BTC" : (monto en BTC que se desean comprar, punto como separador decimal)
	  "buy_BTC_CLP": (valor con el cual se desean comprar los BTC, retornado por /prices)
	  "deliver_BTC": (direccion bitcoin del usuario donde desea recibir los BTC)
	  "email"      : (direccion de email de contacto para notificaciones. Opcional)
	  }

Salida:

    { 
       "status"     : (estado de la orden de compra. "ok" o "error")
       "message"    : (mensaje de error)
       "amount_CLP" : (monto en CLP a pagar a yaykuy)
       "yky_code"   : (codigo para efectuar el pago)
    }
 */

eb.registerHandler(busDir+'.buy', doBuy);

function doBuy (message, replier) {
	var token = message.token;
	if(token==null || token == ''){
		return reply(replier,'error','missing token');
	}

	var request   = client.request('POST', endpoint+'/buy', gotResponse);
    request.chunked(true);

	request.write(JSON.stringify(message));
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

/*
 * /sell
 *
 * Permite ingresar ordenes de venta de BTC por CLP. Usuario tiene BTC y quiere darselos 
a yaykuy a cambio de CLP

Entrada:

     {
      "token"       : (token de autenticacion)
      "amount_BTC"  : (monto en BTC que se desean vender, punto como separador decimal)
	  "sell_BTC_CLP": (valor con el cual se desean vender los BTC, retornado por /prices)
	  "email"       : (direccion de email de contacto para notificaciones. Opcional)
	  "pin"         : (numero de identificacion personal. 4 digitos. Opcional)
	 }

Salida:

    { 
       "status"         : (estado de la orden de venta. "ok" o "error")
       "message"        : (mensaje de error)
       "deposit_BTC"    : (direccion bitcoin de yaykuy a donde se deben enviar los BTC)
       "amount_CLP"     : (monto en CLP que se pagaran al usuario)
	   "yky_code"       : (codigo yky para recibir el pago)
    }
 */

eb.registerHandler(busDir+'.sell', doSell);

function doSell (message, replier) {
	var token = message.token;
	if(token==null || token == ''){
		return reply(replier,'error','missing token');
	}

	var request   = client.request('POST', endpoint+'/sell', gotResponse);
    request.chunked(true);

	request.write(JSON.stringify(message));
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

