import { NodeSDK } from '@opentelemetry/sdk-node';
import { CompositePropagator, W3CTraceContextPropagator, W3CBaggagePropagator } from '@opentelemetry/core';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { B3Propagator, B3InjectEncoding } from '@opentelemetry/propagator-b3';
import * as process from 'process';

const otelSDK = new NodeSDK({
    serviceName: 'backend',
    metricReader: new PrometheusExporter({
        port: 8081,
    }),
    spanProcessor: new BatchSpanProcessor(
        new ZipkinExporter({
            url: process.env.ZipkinExporterUrl,
        })
    ),
    contextManager: new AsyncLocalStorageContextManager(),
    textMapPropagator: new CompositePropagator({
        propagators: [
            new W3CTraceContextPropagator(),
            new W3CBaggagePropagator(),
            new B3Propagator(),
            new B3Propagator({
                injectEncoding: B3InjectEncoding.MULTI_HEADER,
            }),
        ],
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});

export default otelSDK;

process.on('SIGTERM', () => {
    otelSDK
        .shutdown()
        .then(
            () => console.log('SDK shut down successfully'),
            err => console.log('Error shutting down SDK', err)
        )
        .finally(() => process.exit(0));
});