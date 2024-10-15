import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
    }
    ),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: 
      (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    ProductsModule,
    CommonModule,
    SeedModule,
    FilesModule,
    AuthModule,
    MessagesWsModule,
  ]
})
export class AppModule {}
