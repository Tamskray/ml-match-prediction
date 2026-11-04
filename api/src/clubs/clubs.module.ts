import { Module } from '@nestjs/common';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createKeyv } from '@keyv/redis';
import { withFail } from '../common/helpers/redis-fail';

@Module({
  imports: [
    // default cache in server memory
    // CacheModule.register({
    //   max: 100,
    //   ttl: 30000,
    // }),

    // redis cache

    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const redisKeyv = createKeyv(config.getOrThrow<string>('REDIS_URL'), {
          throwOnConnectError: false,
          throwOnErrors: false,
        });

        redisKeyv.on('error', () => {});

        return {
          max: 100,
          ttl: 30000,
          stores: [withFail(redisKeyv)],
        };
      },
    }),
  ],
  controllers: [ClubsController],
  providers: [ClubsService],
})
export class ClubsModule {}
