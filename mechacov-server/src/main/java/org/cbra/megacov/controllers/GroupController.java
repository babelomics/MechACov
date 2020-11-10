package org.cbra.megacov.controllers;

import org.cbra.megacov.repositories.SampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Collection;

@CrossOrigin(origins = "*", methods = {RequestMethod.OPTIONS, RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST})
@RestController
public class GroupController {

    @Autowired
    private SampleRepository sampleRepository;

    @GetMapping("/groups")
    public Collection<String> getAllSampleGroups() throws IOException {
        return sampleRepository.findAllGroups();
    }
}
