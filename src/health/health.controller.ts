import { Controller, Get } from '@nestjs/common';
import { RedisOptions, Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma.health';

@Controller('health')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: PrismaHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  checkHealth() {
    return this.healthCheckService.check([
      () => this.http.pingCheck('Basic Check', 'https://docs.nestjs.com'),
      () => this.db.isHealthy('Database'),
      () =>
        this.microservice.pingCheck<RedisOptions>('Redis', {
          transport: Transport.REDIS,
          options: {
            host: 'redis',
            port: 6379,
          },
        }),
    ]);
  }
}
