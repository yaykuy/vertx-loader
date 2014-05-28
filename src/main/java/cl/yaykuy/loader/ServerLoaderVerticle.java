package cl.yaykuy.loader;

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


import java.util.Map;

import org.vertx.java.core.AsyncResult;
import org.vertx.java.core.Future;
import org.vertx.java.core.Handler;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.core.logging.Logger;
import org.vertx.java.platform.Verticle;

public class ServerLoaderVerticle extends Verticle {
	Logger logger;
	int totalModules,loadedModules=0;
	int totalVerticles,loadedVerticles=0;
	
	public void start(final Future<Void> startedResult) {
		JsonObject config = container.config();
		if(config==null){
			startedResult.setFailure(new Exception("Config Null"));
			return;
		}
		JsonObject appConfig = config.getObject("appConfig");
		if(appConfig==null){
			startedResult.setFailure(new Exception("appConfig Null"));
			return;
		}
		
		deployAllModules(startedResult);
		
	}
	
	private void deployAllModules(final Future<Void> startedResult){
		JsonObject appConfig = container.config().getObject("appConfig");
		JsonObject modulesConfig=null;
		try{
			modulesConfig = appConfig.getObject("modules");
		}catch(Exception e){
			startedResult.setFailure(new Exception("modules malformed"));
			return;
		}
		
		if(modulesConfig != null && modulesConfig.size()>0){
			totalModules=modulesConfig.size();
			for (Map.Entry<String,Object > e : modulesConfig.toMap().entrySet()) {
			    String name = e.getKey();
			    String moduleName = modulesConfig.getObject(name).getString("module");
			    container.deployModule(moduleName,deployedModule(name,startedResult));
			}
		}else{
			deployAllVerticles(startedResult);
		}
	}
	
	
	private Handler<AsyncResult<String>> deployedModule(final String name,final Future<Void> startedResult){
		return new Handler<AsyncResult<String>>(){
			@Override
			public void handle(AsyncResult<String> asyncResult) {
				if (asyncResult.succeeded()) {
					loadedModules++;
				    container.logger().info("Module "+name+ " deployed "+loadedModules+"/"+totalModules);
					if(loadedModules==totalModules){
						deployAllVerticles(startedResult);
				    }
		        } else {
		        	container.logger().error("Deployment of module "+name+ " failed.",
		        			asyncResult.cause());
		        	startedResult.setFailure(asyncResult.cause());
		        }
			}
		};
	}
	
	private void deployAllVerticles(final Future<Void> startedResult){
		JsonObject appConfig = container.config().getObject("appConfig");
		JsonObject verticlesConfig=null;
		try{
			verticlesConfig = appConfig.getObject("verticles");
		}catch(Exception e){
			startedResult.setFailure(new Exception("verticles malformed"));
			return;
		}
		
		if(verticlesConfig != null && verticlesConfig.size()>0){
			totalVerticles=verticlesConfig.size();
			for (Map.Entry<String,Object > e : verticlesConfig.toMap().entrySet()) {
				try{
				    String name = e.getKey();
				    String verticleFile = verticlesConfig.getObject(name).getString("file");
				    if(verticleFile==null){
				    	verticleFile="verticles/"+name+"_verticle.js";
				    }else{
				    	verticleFile="verticles/"+verticleFile;
				    }
				    container.deployVerticle(verticleFile,deployedVerticle(name,startedResult));
				}catch (Exception e2){
					startedResult.setFailure(new Exception("verticle definition malformed"));
					return;
				}
			}
		}else{
			deployServerVerticle(startedResult);
		}
	}
	
	
	private Handler<AsyncResult<String>> deployedVerticle(final String name,final Future<Void> startedResult){
		return new Handler<AsyncResult<String>>(){
			@Override
			public void handle(AsyncResult<String> asyncResult) {
				if (asyncResult.succeeded()) {
					loadedVerticles++;
				    container.logger().info("Verticle "+name+ " deployed "+loadedVerticles+"/"+totalVerticles);
					if(loadedVerticles==totalVerticles){
						deployServerVerticle(startedResult);
				    }
		        } else {
		        	container.logger().error("Deployment of verticle "+name+ " failed.",
		        			asyncResult.cause());
		        	startedResult.setFailure(asyncResult.cause());
		        }
			}
		};
	}

	
	private void deployServerVerticle(final Future<Void> startedResult){
		JsonObject appConfig = container.config().getObject("appConfig");
		String serverVerticleConfig=null;
		try{
			serverVerticleConfig = appConfig.getString("serverVerticle");
		}catch(Exception e){
			startedResult.setFailure(new Exception("serverVerticle malformed"));
			return;
		}
		
		if(serverVerticleConfig != null && !serverVerticleConfig.trim().equals("")){
			String verticleFile = null;
			if(container.config().getObject("server")!= null){
				verticleFile=container.config().getObject("server").getString("file");
			}
		    if(verticleFile==null){
		    	verticleFile="verticles/"+serverVerticleConfig+"_verticle.js";
		    }
		    container.deployVerticle(verticleFile,deployedServerVerticle(verticleFile,startedResult));
		}else{
			done(startedResult);
		}
	}
	
	
	private Handler<AsyncResult<String>> deployedServerVerticle(final String filename,final Future<Void> startedResult){
		return new Handler<AsyncResult<String>>(){
			@Override
			public void handle(AsyncResult<String> asyncResult) {
				if (asyncResult.succeeded()) {
					container.logger().info("Server Verticle file:"+filename+ " deployed ");
					done(startedResult);
		        } else {
		        	container.logger().error("Deployment of Server verticle "+filename+ " failed.",
		        			asyncResult.cause());
		        	startedResult.setFailure(asyncResult.cause());
		        }
			}
		};
	}
	
	private void done(final Future<Void> startedResult){
		container.logger().info("App Ready to Rock!");
		startedResult.setResult(null);
	}
}
