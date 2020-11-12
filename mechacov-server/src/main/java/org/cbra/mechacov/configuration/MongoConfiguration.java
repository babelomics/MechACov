package org.cbra.mechacov.configuration;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCredential;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.lang.NonNull;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "org.cbra.mechacov.repositories")

public class MongoConfiguration  extends AbstractMongoClientConfiguration {

    private final static String ADMIN_DB_NAME = "admin";

    @Value("${mongo.host}")
    private String host;

    @Value("${mongo.port}")
    private Integer port;

    @Value("${mongo.user}")
    private String username;

    @Value("${mongo.password}")
    private String password;

    @Value("${mongo.db.name}")
    private String databaseName;

    @Override
    @NonNull
    public MongoClient mongoClient() {
        var connString = new ConnectionString(String.format("mongodb://%s:%s", host, port));
        var settingsBuilder = MongoClientSettings.builder().applyConnectionString(connString);
        if (StringUtils.isNotBlank(username)) {
            var credential = MongoCredential.createCredential(username, ADMIN_DB_NAME, password.toCharArray());
            settingsBuilder.credential(credential);
        }
        return MongoClients.create(settingsBuilder.build());
    }


    @Override
    protected String getDatabaseName() {
        return databaseName;
    }
}
