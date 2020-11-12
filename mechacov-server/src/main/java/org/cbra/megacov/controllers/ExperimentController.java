package org.cbra.megacov.controllers;

import org.cbra.megacov.entities.Experiment;
import org.cbra.megacov.models.ExperimentRequest;
import org.cbra.megacov.repositories.SampleRepository;
import org.cbra.megacov.services.ExperimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collection;

@CrossOrigin(origins = "*", methods = {RequestMethod.OPTIONS, RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST})
@RestController
public class ExperimentController {

    @Autowired
    private ExperimentService experimentService;

    @PostMapping("/experiments")
    public Experiment postExperiment(@RequestBody ExperimentRequest request) throws IOException {
        return experimentService.createExperiment(request);
    }
}
