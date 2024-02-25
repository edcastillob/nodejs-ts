import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { Exclude } from "class-transformer";


@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @Column()
  username!: string;

  @Column()
  name!: string;

  @Column()
  lastName!: string;
  
  @Column()
  email!: string;

  @Exclude()
  @Column()
  password!: string;

  @Column()
  city!: string;

  @Column()
  province!: string;

  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: CustomerEntity;

}
