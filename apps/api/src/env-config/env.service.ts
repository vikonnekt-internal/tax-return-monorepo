import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvSchema } from './env.constants';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<EnvSchema>) {}

  get jwtConfig(): {
    secret: string;
    expiresIn: string;
  } {
    const secret = this.configService.get<string>('JWT_SECRET') || '';
    const expiresIn = this.configService.get<string>('JWT_EXPIRES') || '';
    return {
      secret,
      expiresIn,
    };
  }

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL') || '';
  }

  get clientUrl(): string {
    return this.configService.get<string>('CLIENT_URL') || '';
  }

  get legalParserServiceUrl(): string {
    return this.configService.get<string>('LEGAL_PARSER_SERVICE_URL') || '';
  }
  get legalFormaterServiceUrl(): string {
    return this.configService.get<string>('LEGAL_FORMATER_SERVICE_URL') || '';
  }
  get microserviceTimeout(): number {
    return parseInt(
      this.configService.get<string>('MICROSERVICE_TIMEOUT') || '300000',
      10,
    );
  }

  get microserviceRetries(): number {
    return parseInt(
      this.configService.get<string>('MICROSERVICE_RETRIES') || '3',
      10,
    );
  }
  get legalAdaptationServiceUrl(): string {
    return this.configService.get<string>('LEGAL_ADAPTATION_SERVICE_URL') || '';
  }
}
