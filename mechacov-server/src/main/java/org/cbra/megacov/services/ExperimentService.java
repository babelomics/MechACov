package org.cbra.megacov.services;

import org.cbra.megacov.entities.Experiment;
import org.cbra.megacov.models.ExperimentRequest;
import org.cbra.megacov.repositories.ExperimentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.file.Path;

@Service
public class ExperimentService {

    @Value("${experiment.directory}")
    private Path experimentDirectory;

    @Autowired
    private ExperimentRepository experimentRepository;

    public Experiment createExperiment(ExperimentRequest request) {
        var experiment = new Experiment();
        experiment.setControlIds(request.getControlIds());
        experiment.setCaseIds(request.getCaseIds());

        experiment = experimentRepository.save(experiment);
        
        return experiment;
    }

}
