package org.cbra.mechacov.repositories;

import org.cbra.mechacov.entities.Experiment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ExperimentRepository extends MongoRepository<Experiment, String> {
    boolean existsByExperimentId(String experimentId);
    Optional<Experiment> findByExperimentId(String experimentId);
}
