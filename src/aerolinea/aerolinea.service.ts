/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AerolineaEntity } from './aerolinea.entity';

@Injectable()
export class AerolineaService {
  constructor(
    @InjectRepository(AerolineaEntity)
    private readonly aerolineaRepository: Repository<AerolineaEntity>
  ) { }

  async findAll(): Promise<AerolineaEntity[]> {
    console.log("entra a revisar");
    return await this.aerolineaRepository.find({ relations: ["aeropuertos"] });
  }

  async findOne(id: string): Promise<AerolineaEntity> {
    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({ where: { id }, relations: ["aeropuertos"] });
    if (!aerolinea)
      throw new BusinessLogicException("The aerolinea with the given id was not found", BusinessError.NOT_FOUND);

    return aerolinea;
  }

  async create(aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
    const date = Date.parse(aerolinea.fechaFundada)
    
    if (date> Date.now())
      throw new BusinessLogicException("fechaFundada must be before today", BusinessError.PRECONDITION_FAILED);
    return await this.aerolineaRepository.save(aerolinea);
  }

  async update(id: string, aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
    const persistedAerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({ where: { id } });
    
    const date = Date.parse(aerolinea.fechaFundada)
    if (!persistedAerolinea)
      throw new BusinessLogicException("The aerolinea with the given id was not found", BusinessError.NOT_FOUND);
    
    if (date> Date.now())
      throw new BusinessLogicException("fechaFundada must be before today", BusinessError.PRECONDITION_FAILED);

    return await this.aerolineaRepository.save({
      ...persistedAerolinea,
      ...aerolinea,
    });
  }

  async delete(id: string) {
    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({ where: { id } });
    if (!aerolinea)
      throw new BusinessLogicException("The aerolinea with the given id was not found", BusinessError.NOT_FOUND);

    await this.aerolineaRepository.remove(aerolinea);
  }
}
/* archivo: src/aerolinea/aerolinea.service.ts */