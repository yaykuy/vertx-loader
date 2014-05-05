# vertx-yaykuy :: Yaykuy API access

## Dependencies

No dependencies on other modules

## Name

The module name is `yaykuy`.

## Configuration

This busmod takes the following configuration:

    {
        "address": <address>
        
    }
    
For example:

    {
        "address": "yaykuy"
    }        
    
Let's take a look at each field in turn:

* `address` The main address for the busmod. Optional field. Default value is `yaykuy`

##Actions

Look at https://api.yaykuy.cl/

Implemented:
 
 * /prices
 * /buy
 
[![Build Status](https://travis-ci.org/yaykuy/vertx-yaykuy.svg?branch=master)](https://travis-ci.org/yaykuy/vertx-yaykuy)