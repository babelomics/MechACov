package org.cbra.mechacov.jobs;


import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;

@Log
@Service
public class JobScheduler {

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    // @Scheduled(fixedDelay = 15000)
    private void runJob() {
        // log.info("The time now is {}", dateFormat.format(new Date()));
        // log.info("Hello");
    }
}
