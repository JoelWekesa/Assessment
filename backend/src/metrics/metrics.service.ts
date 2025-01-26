// metrics.service.ts
import { Injectable } from '@nestjs/common';
import { Counter, Meter, metrics } from '@opentelemetry/api';

@Injectable()
export class MetricsService {
    private successCounter: Counter;
    private failureCounter: Counter;


    constructor() {
        const meter: Meter = metrics.getMeter('todo-service');

        this.successCounter = meter.createCounter('todo_request_success_total', {
            description: 'Total successful todo requests'
        });

        this.failureCounter = meter.createCounter('todo_request_failure_total', {
            description: 'Total failed todo requests'
        });
    }

    recordSuccess() {
        this.successCounter.add(1);
    }

    recordFailure() {
        this.failureCounter.add(1);
    }

}


