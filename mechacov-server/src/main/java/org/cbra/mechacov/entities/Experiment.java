package org.cbra.mechacov.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Document
public class Experiment {

    public static enum State {
        IN_DEFINITION,
        IN_EVALUATION,
        FINISHED
    }

    @Id
    private String id;
    private String experimentId;

    private Instant creationTime;

    private State state = State.IN_DEFINITION;

    private List<String> controlIds;
    private List<String> caseIds;
}
