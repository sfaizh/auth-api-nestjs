import { Role } from '@src/auth/decorators/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  name: string

  @Column()
  email: string

  @Column({ nullable: true })
  refreshToken: string

  @Column('simple-array')
  roles: Role[]
}