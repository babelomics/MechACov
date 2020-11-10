package org.cbra.megacov.configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfiguration {
    @Bean
    public OpenAPI api() {
        var components = new Components();
        // components.addSecuritySchemes("bearer-key", new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT"));
        Info info = new Info().title("MechACov").description("MechACov-Server v0.1");
        return new OpenAPI().components(components).info(info);
    }
}
