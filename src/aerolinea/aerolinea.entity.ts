/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';

@Entity()
export class AerolineaEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 descripcion: string;
 
 @Column()
 fechaFundada: string;
 
 @Column()
 paginaWeb: string;
 
 @ManyToMany(() => AeropuertoEntity, aeropuerto => aeropuerto.aerolineas)
 @JoinTable()
 aeropuertos: AeropuertoEntity[];

}