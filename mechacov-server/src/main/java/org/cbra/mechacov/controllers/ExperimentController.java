package org.cbra.mechacov.controllers;

import org.cbra.mechacov.entities.Experiment;
import org.cbra.mechacov.entities.Sample;
import org.cbra.mechacov.services.ExperimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", methods = {RequestMethod.OPTIONS, RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST})
@RestController
public class ExperimentController {

    @Autowired
    private ExperimentService experimentService;

    @PostMapping("/experiments")
    public Experiment createExperiment() throws IOException {
        return experimentService.createExperiment();
    }

    @GetMapping("/experiments/{experimentId}")
    public Experiment getExperiment(@PathVariable String experimentId) throws IOException {
        var experiment = experimentService.getExperiment(experimentId);
        if (experiment.isEmpty()) {
            throw new FileNotFoundException();
        } else {
            return experiment.get();
        }
    }

    @GetMapping("/experiments/{{experimentId}/availableSamples/{pageSize}/{page}")
    public List<Sample> getExperimentAvailableSamplesPage(
            @PathVariable String experimentId,
            @PathVariable int pageSize,
            @PathVariable int page
    ) {
        return List.of();
    }

    @GetMapping("/experiments/{{experimentId}/controls/{pageSize}/{page}")
    public List<Sample> getExperimentControlsPage(
            @PathVariable String experimentId,
            @PathVariable int pageSize,
            @PathVariable int page
    ) {
        return List.of();
    }

    @GetMapping("/experiments/{{experimentId}/cases/{pageSize}/{page}")
    public List<Sample> getExperimentCasesSamplePage(
            @PathVariable String experimentId,
            @PathVariable int pageSize,
            @PathVariable int page
    ) {
        return List.of();
    }

    @PutMapping("/experiments/{{experimentId}/controls")
    public void addExperimentControls(
            @PathVariable String experimentId,
            @PathVariable int pageSize,
            @PathVariable int page,
            @RequestBody Map requestBody

    ) {
    }

    @PutMapping("/experiments/{{experimentId}/cases")
    public void addExperimentCases(
            @PathVariable String experimentId,
            @PathVariable int pageSize,
            @PathVariable int page,
            @RequestBody Map requestBody
    ) {
    }

    @DeleteMapping("/experiments/{{experimentId}/controls")
    public void removeExperimentControls(
            @PathVariable String experimentId,
            @PathVariable int pageSize,
            @PathVariable int page,
            @RequestBody Map requestBody
    ) {
    }

    @DeleteMapping("/experiments/{{experimentId}/cases")
    public void removeExperimentCases(
            @PathVariable String experimentId,
            @PathVariable int pageSize,
            @PathVariable int page,
            @RequestBody Map requestBody
    ) {
    }




}
