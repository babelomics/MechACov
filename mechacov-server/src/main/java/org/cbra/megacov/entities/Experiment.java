package org.cbra.megacov.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Experiment {
    @Id
    private String id;
    private List<String> controlIds;
    private List<String> caseIds;
}
