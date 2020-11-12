package org.cbra.megacov.controllers;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.cbra.megacov.entities.Sample;
import org.cbra.megacov.models.SampleFilter;
import org.cbra.megacov.repositories.SampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.OPTIONS, RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST})
@RestController
public class SampleController {

    @Autowired
    private SampleRepository sampleRepository;

    @GetMapping("/samplesSetup")
    public void setupSamples() throws IOException {
        var resourceLoader = new DefaultResourceLoader();
        var resource = resourceLoader.getResource("classpath:static/rna_seq_metadata.tsv");
        assert(null != resource);
        try (
                var stream = resource.getInputStream();
                var streamReader = new InputStreamReader(stream);
                var reader = new BufferedReader(streamReader);
                ) {
            boolean header = true;
            for (String line = reader.readLine(); null != line; line = reader.readLine()) {
                if (header) {
                    header = false;
                } else {
                    var fields = line.split("\t", 10);
                    var sample = new Sample();
                    sample.setStudyId(StringUtils.trim(fields[0]));
                    sample.setGsmId(StringUtils.trim(fields[1]));
                    sample.setColumnId(StringUtils.trim(fields[2]));
                    sample.setGroup(StringUtils.trim(fields[3]));
                    sample.setHpi(StringUtils.trim(fields[4]));
                    sample.setMoi(StringUtils.trim(fields[5]));
                    sample.setStrain(StringUtils.trim(fields[6]));
                    sample.setTissueCellLine(StringUtils.trim(fields[7]));
                    sample.setPlatform(StringUtils.trim(fields[8]));
                    sample.setPlatformDetails(StringUtils.trim(fields[9]));
                    sampleRepository.save(sample);
                }
            }
        }
    }

    @GetMapping("/samples/count")
    public Long getSamples(
            @RequestParam(name = "studyId", required = false) List<String> studyIds,
            @RequestParam(name = "group", required = false) List<String> groups,
            @RequestParam(name = "strain", required = false) List<String> strains,
            @RequestParam(name = "tissueCellLine", required = false) List<String> tissueCellLines,
            @RequestParam(name = "platform", required = false) List<String> platforms,
            @RequestParam(name = "platformDetails", required = false) List<String> platformDetails,
            @RequestParam(name = "minHpi", required = false) Integer minHpi,
            @RequestParam(name = "maxHpi", required = false) Integer maxHpi,
            @RequestParam(name = "minMoi", required = false) Integer minMoi,
            @RequestParam(name = "maxMoi", required = false) Integer maxMoi
    ) {
        var filter = buildSampleFilter(studyIds, groups, strains, tissueCellLines, platforms, platformDetails, minHpi, maxHpi, minMoi, maxMoi);
        return sampleRepository.countFilter(filter);
    }

    @GetMapping("/samplePages/{pageSize}/{page}")
    public List<Sample> getSamplePages(
            @PathVariable int pageSize,
            @PathVariable int page,
            @RequestParam(name = "studyId", required = false) List<String> studyIds,
            @RequestParam(name = "group", required = false) List<String> groups,
            @RequestParam(name = "strain", required = false) List<String> strains,
            @RequestParam(name = "tissueCellLine", required = false) List<String> tissueCellLines,
            @RequestParam(name = "platform", required = false) List<String> platforms,
            @RequestParam(name = "platformDetails", required = false) List<String> platformDetails,
            @RequestParam(name = "minHpi", required = false) Integer minHpi,
            @RequestParam(name = "maxHpi", required = false) Integer maxHpi,
            @RequestParam(name = "minMoi", required = false) Integer minMoi,
            @RequestParam(name = "maxMoi", required = false) Integer maxMoi
    ) {
        var filter = buildSampleFilter(studyIds, groups, strains, tissueCellLines, platforms, platformDetails, minHpi, maxHpi, minMoi, maxMoi);
        return sampleRepository.findByFilter(filter, PageRequest.of(page, pageSize));
    }

    private static SampleFilter buildSampleFilter(
            List<String> studyIds,
            List<String> groups,
            List<String> strains,
            List<String> tissueCellLines,
            List<String> platforms,
            List<String> platformDetails,
            Integer minHpi,
            Integer maxHpi,
            Integer minMoi,
            Integer maxMoi
    ) {
        var filter = new SampleFilter();

        if (CollectionUtils.isNotEmpty(studyIds)) {
            filter.getStudyIds().addAll(studyIds);
        }
        if (CollectionUtils.isNotEmpty(groups)) {
            filter.getGroups().addAll(groups);
        }
        if (CollectionUtils.isNotEmpty(strains)) {
            filter.getStrains().addAll(strains);
        }
        if (CollectionUtils.isNotEmpty(tissueCellLines)) {
            filter.getTissueCellLines().addAll(tissueCellLines);
        }
        if (CollectionUtils.isNotEmpty(platforms)) {
            filter.getPlatforms().addAll(platforms);
        }
        if (CollectionUtils.isNotEmpty(platformDetails)) {
            filter.getPlatformDetails().addAll(platformDetails);
        }
        if (null != minHpi) {
            filter.setMinHpi(minHpi);
        }
        if (null != maxHpi) {
            filter.setMaxHpi(maxHpi);
        }
        if (null != minMoi) {
            filter.setMinMoi(minMoi);
        }
        if (null != maxMoi) {
            filter.setMaxMoi(maxMoi);
        }

        return filter;
    }
}
