package org.cbra.megacov.repositories.mongo;


import org.cbra.megacov.entities.Sample;
import org.cbra.megacov.models.SampleFilter;
import org.cbra.megacov.repositories.SampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class MongoSampleRepository implements SampleRepository {

    private static final String COLLECTION_NAME = "samples";

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Collection<String> findAllGroups() {
        var query = Query.query(new Criteria());
        return mongoTemplate.findDistinct(query, "group", COLLECTION_NAME, String.class);
    }

    @Override
    public Collection<String> findAllStrains() {
        var query = Query.query(new Criteria());
        return mongoTemplate.findDistinct(query, "strain", COLLECTION_NAME, String.class);
    }

    @Override
    public Collection<String> findAllTissueCellTypes() {
        var query = Query.query(new Criteria());
        return mongoTemplate.findDistinct(query, "tissueCellType", COLLECTION_NAME, String.class);
    }

    @Override
    public Collection<String> findAllPlatforms() {
        var query = Query.query(new Criteria());
        return mongoTemplate.findDistinct(query, "platform", COLLECTION_NAME, String.class);
    }

    @Override
    public Collection<String> findAllPlatformDetails(String platform) {
        var query = Query.query(Criteria.where("platform").is(platform));
        return mongoTemplate.findDistinct(query, "platformDetails", COLLECTION_NAME, String.class);
    }

    @Override
    public Collection<String> findAllPlatformDetails(Collection<String> platforms) {

        var criteria = platforms.isEmpty() ? new Criteria() : Criteria.where("platform").in(platforms);
        var query = Query.query(criteria);
        return mongoTemplate.findDistinct(query, "platformDetails", COLLECTION_NAME, String.class);
    }

    @Override
    public long countFilter(SampleFilter filter) {
        var query = Query.query(buildCriteriaFromFilter(filter));
        return mongoTemplate.count(query, COLLECTION_NAME);
    }

    @Override
    public List<Sample> findByFilter(SampleFilter filter, Pageable pageable) {
        var query = Query.query(buildCriteriaFromFilter(filter)).with(pageable);
        return mongoTemplate.find(query, Sample.class, COLLECTION_NAME);
    }

    private static Criteria buildCriteriaFromFilter(SampleFilter filter) {
        var criterias = new ArrayList<Criteria>();

        if (!filter.getStudyIds().isEmpty()) {
            var criteria = Criteria.where("studyId").in(filter.getStudyIds());
            criterias.add(criteria);
        }
        if (!filter.getGroups().isEmpty()) {
            var criteria = Criteria.where("group").in(filter.getGroups());
            criterias.add(criteria);
        }
        if (!filter.getStrains().isEmpty()) {
            var criteria = Criteria.where("strain").in(filter.getStrains());
            criterias.add(criteria);
        }
        if (!filter.getTissueCellTypes().isEmpty()) {
            var criteria = Criteria.where("tissueCellType").in(filter.getTissueCellTypes());
            criterias.add(criteria);
        }
        if (!filter.getPlatforms().isEmpty()) {
            var criteria = Criteria.where("platform").in(filter.getPlatforms());
            criterias.add(criteria);
        }
        if (!filter.getPlatformDetails().isEmpty()) {
            var criteria = Criteria.where("platformDetails").in(filter.getPlatformDetails());
            criterias.add(criteria);
        }
        if (filter.getMinHpi().isPresent()) {
            var criteria = Criteria.where("hpi").gte(filter.getMinHpi().get());
            criterias.add(criteria);
        }
        if (filter.getMaxHpi().isPresent()) {
            var criteria = Criteria.where("hpi").lte(filter.getMaxHpi().get());
            criterias.add(criteria);
        }
        if (filter.getMinMoi().isPresent()) {
            var criteria = Criteria.where("moi").gte(filter.getMinMoi().get());
            criterias.add(criteria);
        }
        if (filter.getMaxMoi().isPresent()) {
            var criteria = Criteria.where("moi").lte(filter.getMaxMoi().get());
            criterias.add(criteria);
        }

        // var finalCriteria = criterias.isEmpty() ? new Criteria() : 1 == criterias.size() ? criterias.get(0) : new Criteria().andOperator(criterias);
        return criterias.isEmpty() ? new Criteria() : 1 == criterias.size() ? criterias.get(0) : new Criteria().andOperator(criterias.toArray(Criteria[]::new));
    }

    @Override
    public <T extends Sample> T save(T sample) {
        return mongoTemplate.save(sample, COLLECTION_NAME);
    }


}
