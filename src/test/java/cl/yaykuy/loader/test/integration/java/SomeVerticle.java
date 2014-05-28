package cl.yaykuy.loader.test.integration.java;

import org.vertx.java.platform.Verticle;
import org.vertx.testtools.VertxAssert;

public class SomeVerticle extends Verticle {

  public void start() {
    VertxAssert.initialize(vertx);

    VertxAssert.testComplete();
  }
}
