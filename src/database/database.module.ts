import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('PG_HOST'),
        port: config.getOrThrow<number>('PG_PORT'),
        username: config.getOrThrow<string>('PG_USER'),
        password: config.getOrThrow<string>('PG_PASSWORD'),
        database: config.getOrThrow<string>('PG_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        ssl: config.getOrThrow<string>('PG_SSLMODE') === 'true',
        synchronize: config.getOrThrow<string>('PG_SYNC') === 'true',
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
