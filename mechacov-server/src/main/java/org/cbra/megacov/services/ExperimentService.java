package org.cbra.megacov.services;

import org.cbra.megacov.entities.Experiment;
import org.cbra.megacov.models.ExperimentRequest;
import org.springframework.stereotype.Service;

@Service
public class ExperimentService {

    public Experiment createExperiment(ExperimentRequest request) {
        var experiment = new Experiment();
        experiment.setControlIds(request.getControlIds());
        experiment.setCaseIds(request.getCaseIds());
        return experiment;
    }

}
