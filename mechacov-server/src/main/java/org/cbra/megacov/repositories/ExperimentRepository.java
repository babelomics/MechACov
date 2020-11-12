package org.cbra.megacov.repositories;

import org.cbra.megacov.entities.Experiment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExperimentRepository extends MongoRepository<Experiment, String> {
}
