package cl.yaykuy.loader;

import org.vertx.java.core.Future;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.core.logging.Logger;
import org.vertx.java.platform.Verticle;

public class ServerLoaderVerticle extends Verticle {
	Logger logger;
	
	public void start(final Future<Void> startedResult) {
		logger = container.logger();
		
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
		JsonObject modulesConfig = appConfig.getObject("modules");
		if(modulesConfig != null){
			modules(modulesConfig);
		}
		
		startedResult.setResult(null);
	}
	
	private void modules(JsonObject configModules){
		logger.info("Modules :"+ configModules);
	}
	

}
