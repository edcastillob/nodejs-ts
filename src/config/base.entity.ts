import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ name: "create_ad", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_ad", type: "timestamp" })
  updatedAt!: Date;
}
