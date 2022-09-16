import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';
import { AeropuertoEntity } from './aerolinea/aerolinea.entity';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AerolineaEntity } from './aerolinea/aerolinea.entity';

@Module({
  imports: [
    AeropuertoModule,
    AerolineaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'aerolinea',
      entities: [
        AeropuertoEntity,
        AerolineaEntity,
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