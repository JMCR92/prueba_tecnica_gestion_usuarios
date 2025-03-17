import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
 

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,    //specifies use of http exception filter archive
      useClass: HttpExceptionFilter, 
    },
  ],
  imports: [  //imports Users module and mongoDB configuration 
    UsersModule,  
    ConfigModule.forRoot({
      isGlobal:true,  //makes configuration available globally
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        user: configService.get<string>('MONGO_USER') ?? undefined,  
        pass: configService.get<string>('MONGO_PASSWORD') ?? undefined,  
        authSource: configService.get<string>('MONGO_AUTH_SOURCE') ?? "admin",  
    }),
    inject:[ConfigService],
    }),
  ],
})
export class AppModule {}
