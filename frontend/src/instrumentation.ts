/* eslint-disable no-var */
import type { Logger } from 'pino';
import { Registry, collectDefaultMetrics, Counter } from 'prom-client';
import { registerOTel } from '@vercel/otel'

declare global {
    var logger: Logger | undefined
    var metrics: {
        registry: Registry
        pageVisits: Counter
    } | undefined


}

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const pino = (await import('pino')).default;
        const pinoLoki = (await import('pino-loki')).default;

        const transport = pinoLoki({
            host: process.env.PINO_LOKI_URL || 'http://localhost:3100',
            batching: true,
            interval: 5,
            labels: { app: 'frontend' },
        });

        const logger = pino(transport);

        globalThis.logger = logger;


        const prometheusRegistry = new Registry()

        collectDefaultMetrics({ register: prometheusRegistry });

        const pageVisits = new Counter({
            name: 'page_visits',
            help: 'Number of visits to the page',
            registers: [prometheusRegistry],
            labelNames: ['plain_type', 'referral_source']
        });

        prometheusRegistry.registerMetric(pageVisits);

        globalThis.metrics = {
            registry: prometheusRegistry,
            pageVisits
        }

        registerOTel()
    }
}