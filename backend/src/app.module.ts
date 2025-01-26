import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { OpenTelemetryModule } from 'nestjs-otel';
import { LoggerModule } from 'nestjs-pino';
import { MetricsService } from './metrics/metrics.service';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
    apiMetrics: {
      enable: true,
      defaultAttributes: {
        custom: 'label',
      },
      ignoreRoutes: ['/favicon.ico'],
      ignoreUndefinedRoutes: false,
      prefix: 'api',
    },
  },
})

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
    }),
    PrometheusModule.register(),
    OpenTelemetryModuleConfig,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, MetricsService],
})
export class AppModule { }
