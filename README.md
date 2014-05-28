# vertx-loader :: Vert.x Server Loader

## Dependencies

No dependencies on other modules

## Name

The module name is `loader`.

## Configuration

This busmod takes the following configuration:

	// Vert.x Server Loader JSON config file
	{
	//Module and Verticle loading config
	"appConfig" :{
		//Module loading		
		"modules" :{
			
		},
		//Own verticles loading
		"verticles"	: {

		},
		//Last verticle to start. Server verticle
		"serverVerticle"	: ""
	}

	//Modules and verticles config
}
    
For example:
    {

    }        
    
Let's take a look at each field in turn:


##Actions

(none)
 
[![Build Status](https://travis-ci.org/yaykuy/vertx-loader.svg?branch=master)](https://travis-ci.org/yaykuy/vertx-loader)

[![Build Status](https://api.shippable.com/projects/5385f6f88ec276cf01d05576/badge/master)](https://www.shippable.com/projects/5385f6f88ec276cf01d05576)
