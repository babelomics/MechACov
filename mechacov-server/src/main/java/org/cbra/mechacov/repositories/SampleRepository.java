package org.cbra.mechacov.repositories;

import org.cbra.mechacov.entities.Sample;
import org.cbra.mechacov.models.SampleFilter;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.List;


public interface SampleRepository {

    <T extends Sample> T save(T sample);

    Collection<String> findAllStudies();
    Collection<String> findAllGroups();
    Collection<String> findAllStrains();
    Collection<String> findAllTissueCellLines();
    Collection<String> findAllPlatforms();
    Collection<String> findAllPlatformDetails(String platform);
    Collection<String> findAllPlatformDetails(Collection<String> platforms);

    long countFilter(SampleFilter filter);
    List<Sample> findByFilter(SampleFilter filter, Pageable pageable);

    boolean existsById(String sampleId);
}
