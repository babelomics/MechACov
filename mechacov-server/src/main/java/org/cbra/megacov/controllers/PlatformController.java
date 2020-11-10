package org.cbra.megacov.controllers;

import org.cbra.megacov.repositories.SampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.OPTIONS, RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST})
@RestController
public class PlatformController {

    @Autowired
    private SampleRepository sampleRepository;

    @GetMapping("/platforms")
    public Collection<String> getAllSamplePlatforms() throws IOException {
        return sampleRepository.findAllPlatforms();
    }

    /*
    @GetMapping("/platforms/{platformId}/details")
    public Collection<String> getAllSamplePlatformDetailss(@PathVariable String platformId) throws IOException {
        return sampleRepository.findAllPlatformDetails(platformId);
    }
    */

    @GetMapping("/platforms/details")
    public Collection<String> getAllSamplePlatformDetailss(@RequestParam(name = "platformId", required = false) List<String> platformIds) throws IOException {
        return sampleRepository.findAllPlatformDetails(platformIds);
    }

}
