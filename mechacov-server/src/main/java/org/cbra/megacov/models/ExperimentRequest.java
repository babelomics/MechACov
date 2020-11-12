package org.cbra.megacov.models;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Data
public class ExperimentRequest {
    private final List<String> controlIds;
    private final List<String> caseIds;
}
