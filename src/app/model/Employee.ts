import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BeforeInsert, 
  BeforeUpdate 
} from "typeorm";
import bcrypt from 'bcryptjs'; 

@Entity('employee')
class Employee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string

  @Column()
  level_authorization: number

  @Column()
  user_name: string

  @Column()
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  passwordHash(){
    this.password = bcrypt.hashSync(this.password, 8)
  }

}

export default Employee;
