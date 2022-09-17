/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AeropuertoEntity } from './aeropuerto.entity';
import { AeropuertoService } from './aeropuerto.service';

import { faker } from '@faker-js/faker';

describe('AeropuertoService', () => {
  let service: AeropuertoService;
  let repository: Repository<AeropuertoEntity>;
  let aeropuertosList: AeropuertoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AeropuertoService],
    }).compile();

    service = module.get<AeropuertoService>(AeropuertoService);
    repository = module.get<Repository<AeropuertoEntity>>(getRepositoryToken(AeropuertoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    aeropuertosList = [];
    for(let i = 0; i < 5; i++){
        const aeropuerto: AeropuertoEntity = await repository.save({
        nombre: faker.name.firstName(), 
        codigo: faker.lorem.word(3), 
        pais: faker.address.country(),
        ciudad: faker.address.city()})
        aeropuertosList.push(aeropuerto);
    }
  }
    


  it('findAll should return all aeropuertos', async () => {
    const aeropuertos: AeropuertoEntity[] = await service.findAll();
    expect(aeropuertos).not.toBeNull();
    expect(aeropuertos).toHaveLength(aeropuertosList.length);
  });

  it('findOne should return a aeropuerto by id', async () => {
    const storedAeropuerto: AeropuertoEntity = aeropuertosList[0];
    const product: AeropuertoEntity = await service.findOne(storedAeropuerto.id);
    expect(product).not.toBeNull();
    expect(product.nombre).toEqual(storedAeropuerto.nombre)
    expect(product.codigo).toEqual(storedAeropuerto.codigo)
    expect(product.pais).toEqual(storedAeropuerto.pais)
    expect(product.ciudad).toEqual(storedAeropuerto.ciudad)
  });

  it('findOne should throw an exception for an invalid aeropuerto', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The aeropuerto with the given id was not found")
  });

  it('create should return a new aeropuerto', async () => {
    const product: AeropuertoEntity = {
      nombre: faker.name.firstName(),
      codigo: faker.lorem.word(3),
      pais: faker.address.country(),
      ciudad: faker.address.cityName(),
      id: '',
      aerolineas: [],
    }

    const newAeropuerto: AeropuertoEntity = await service.create(product);
    expect(newAeropuerto).not.toBeNull();

    const storedAeropuerto: AeropuertoEntity = await repository.findOne({where: {id: newAeropuerto.id}})
    expect(storedAeropuerto).not.toBeNull();
    expect(storedAeropuerto.nombre).toEqual(newAeropuerto.nombre)
    expect(storedAeropuerto.codigo).toEqual(newAeropuerto.codigo)
    expect(storedAeropuerto.pais).toEqual(newAeropuerto.pais)
    expect(storedAeropuerto.ciudad).toEqual(newAeropuerto.ciudad)
  });

  it('update should modify a aeropuerto', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertosList[0];
    aeropuerto.nombre = "New name";
    aeropuerto.codigo = "CDM";
  
    const updatedAeropuerto: AeropuertoEntity = await service.update(aeropuerto.id, aeropuerto);
    expect(updatedAeropuerto).not.toBeNull();
  
    const storedAeropuerto: AeropuertoEntity = await repository.findOne({ where: { id: aeropuerto.id } })
    expect(storedAeropuerto).not.toBeNull();
    expect(storedAeropuerto.nombre).toEqual(aeropuerto.nombre)
    expect(storedAeropuerto.codigo).toEqual(aeropuerto.codigo)
    expect(storedAeropuerto.pais).toEqual(aeropuerto.pais)
    expect(storedAeropuerto.ciudad).toEqual(aeropuerto.ciudad)
  });
 
  it('update should throw an exception for an invalid aeropuerto', async () => {
    
    let aeropuerto: AeropuertoEntity = aeropuertosList[0];
    aeropuerto = {
      ...aeropuerto, nombre: "New name", codigo: "CDM"
    }
    await expect(() => service.update("0", aeropuerto)).rejects.toHaveProperty("message", "The aeropuerto with the given id was not found")
  });

  it('delete should remove a aeropuerto', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertosList[0];
    await service.delete(aeropuerto.id);
  
    const deletedAeropuerto: AeropuertoEntity = await repository.findOne({ where: { id: aeropuerto.id } })
    expect(deletedAeropuerto).toBeNull();
  });

  it('delete should throw an exception for an invalid aeropuerto', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertosList[0];
    await service.delete(aeropuerto.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The aeropuerto with the given id was not found")
  });
 
});