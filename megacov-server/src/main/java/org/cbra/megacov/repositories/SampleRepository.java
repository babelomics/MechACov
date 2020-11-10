package org.cbra.megacov.repositories;

import org.cbra.megacov.entities.Sample;
import org.cbra.megacov.models.SampleFilter;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.List;


public interface SampleRepository {

    <T extends Sample> T save(T sample);

    Collection<String> findAllGroups();
    Collection<String> findAllStrains();
    Collection<String> findAllTissueCellTypes();
    Collection<String> findAllPlatforms();
    Collection<String> findAllPlatformDetails(String platform);
    Collection<String> findAllPlatformDetails(Collection<String> platforms);

    long countFilter(SampleFilter filter);
    List<Sample> findByFilter(SampleFilter filter, Pageable pageable);
}
