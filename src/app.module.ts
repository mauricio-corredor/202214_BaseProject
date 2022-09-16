/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolineaEntity } from './aerolinea/aerolinea.entity';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AeropuertoEntity } from './aeropuerto/aeropuerto.entity';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';


@Module({
  imports: [
    AerolineaModule,
    AeropuertoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'aeropuerto',
      entities: [
        AerolineaEntity,
        AeropuertoEntity,
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}