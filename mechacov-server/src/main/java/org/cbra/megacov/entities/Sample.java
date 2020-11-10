package org.cbra.megacov.entities;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Sample {
    @Id
    private String id;
    private String studyId;
    private String gsmId;
    private String columnId;
    private String group;
    private String hpi;
    private String moi;
    private String strain;
    private String tissueCellLine;
    private String platform;
    private String platformDetails;
}
