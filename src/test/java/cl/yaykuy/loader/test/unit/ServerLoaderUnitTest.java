package cl.yaykuy.loader.test.unit;

import static org.junit.Assert.*;

import org.junit.Test;

import cl.yaykuy.loader.ServerLoaderVerticle;

public class ServerLoaderUnitTest {

	@Test
	public void test() {
		ServerLoaderVerticle slv = new ServerLoaderVerticle();
	    assertNotNull(slv);
	    
	}

}
