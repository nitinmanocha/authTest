import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public first_name: string;
  public last_name: string;
  public email: string;
  public password_hash: string;
  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date;
  public active: boolean;
}
