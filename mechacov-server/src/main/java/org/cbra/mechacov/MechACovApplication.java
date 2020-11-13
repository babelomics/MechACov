package org.cbra.mechacov;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MechACovApplication {

	public static void main(String[] args) {
		SpringApplication.run(MechACovApplication.class, args);
	}

}
