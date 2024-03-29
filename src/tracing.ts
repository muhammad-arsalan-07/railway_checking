import {
    ConsoleSpanExporter,
    SimpleSpanProcessor,
  } from '@opentelemetry/sdk-trace-base';
  import { NodeSDK } from '@opentelemetry/sdk-node';
  import * as process from 'process';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
//   const traceExporter = new ConsoleSpanExporter();

const jaegerExporter = new JaegerExporter({
    endpoint: 'http://192.168.28.129:14268/api/traces',
  });
  
  const oltpExporter = new OTLPTraceExporter({
    url: `https://api.honeycomb.io/v1/traces`,
    headers: {
      'x-honeycomb-team': 'bzKwCqkVl2rBFNK0JUyoYB',
    },
  });
//   const traceExporter = jaegerExporter;
  const traceExporter = oltpExporter;
  
  
  export const otelSDK = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: `nestjs-otel`, // update this to a more relevant name for you!
      }),
    spanProcessor: new SimpleSpanProcessor(traceExporter),
    instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation(),  new NestInstrumentation(),],
  });
  
  // gracefully shut down the SDK on process exit
  process.on('SIGTERM', () => {
    otelSDK
      .shutdown()
      .then(
        () => console.log('SDK shut down successfully'),
        (err) => console.log('Error shutting down SDK', err),
      )
      .finally(() => process.exit(0));
  });
  