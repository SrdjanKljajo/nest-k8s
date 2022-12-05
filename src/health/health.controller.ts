import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma.health';

@Controller('health')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  checkHealth() {
    return this.healthCheckService.check([
      () => this.http.pingCheck('Basic Check', 'https://docs.nestjs.com'),
      () => this.db.isHealthy('Database is Connected'),
    ]);
  }
}
