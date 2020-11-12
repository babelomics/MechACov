package org.cbra.mechacov.models;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Data
public class SampleFilter {
    private final List<String> studyIds = new ArrayList<>();
    private final List<String> groups = new ArrayList<>();
    private final List<String> strains = new ArrayList<>();
    private final List<String> tissueCellLines = new ArrayList<>();
    private final List<String> platforms = new ArrayList<>();
    private final List<String> platformDetails = new ArrayList<>();

    private Optional<Integer> minHpi = Optional.empty();
    private Optional<Integer> maxHpi = Optional.empty();
    private Optional<Integer> minMoi = Optional.empty();
    private Optional<Integer> maxMoi = Optional.empty();

    public void setMinHpi(Integer hpi) {
        this.minHpi = null == hpi ? Optional.empty() : Optional.of(hpi);
    }

    public void setMaxHpi(Integer hpi) {
        this.maxHpi = null == hpi ? Optional.empty() : Optional.of(hpi);
    }

    public void setMinMoi(Integer moi) {
        this.minMoi = null == moi ? Optional.empty() : Optional.of(moi);
    }

    public void setMaxMoi(Integer moi) {
        this.maxMoi = null == moi ? Optional.empty() : Optional.of(moi);
    }

    public boolean isEmpty() {
        return studyIds.isEmpty()
                && groups.isEmpty()
                && strains.isEmpty()
                && tissueCellLines.isEmpty()
                && platforms.isEmpty()
                && platformDetails.isEmpty()
                && minHpi.isEmpty()
                && maxHpi.isEmpty()
                && minMoi.isEmpty()
                && maxHpi.isEmpty();
    }
}
