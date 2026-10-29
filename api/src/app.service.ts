import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    const appEnv = this.configService.get<string>('APP_ENV', 'localhost');
    return `Hello World from ${appEnv}`;
  }
}
