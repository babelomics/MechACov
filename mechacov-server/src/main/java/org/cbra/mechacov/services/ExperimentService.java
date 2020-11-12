package org.cbra.mechacov.services;

import lombok.extern.java.Log;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.cbra.mechacov.entities.Experiment;
import org.cbra.mechacov.repositories.ExperimentRepository;
import org.cbra.mechacov.repositories.SampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@Log
@Service
public class ExperimentService {

    @Value("${experiment.directory}")
    private String experimentDirectory;

    @Autowired
    private ExperimentRepository experimentRepository;

    @Autowired
    private SampleRepository sampleRepository;

    public Experiment createExperiment() {
        var experiment = new Experiment();

        while (StringUtils.isEmpty(experiment.getExperimentId()) || experimentRepository.existsByExperimentId(experiment.getExperimentId())) {
            var experimentId = RandomStringUtils.randomAlphanumeric(64);
            log.info("Trying experiment identifier " + experimentId);
            experiment.setExperimentId(experimentId);
        }
        log.info("Experiment identifier " + experiment.getExperimentId());
        experiment.setCreationTime(Instant.now());
        experiment.setState(Experiment.State.IN_DEFINITION);
        experiment.setControlIds(new ArrayList<>());
        experiment.setCaseIds(new ArrayList<>());

        return experiment = experimentRepository.save(experiment);
    }

    public Optional<Experiment> getExperiment(String experimentId) {
        return experimentRepository.findByExperimentId(experimentId);
    }

    private void checkSamplesExists(Collection<String> sampleIds) {
        for (var sampleId : sampleIds) {
            if (!sampleRepository.existsById(sampleId)) {
                throw new InvalidParameterException(sampleId);
            }
        }
    }

}
