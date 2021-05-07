import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn 
} from "typeorm";

@Entity('movies')
class Movies {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 30 })
  name: string

  @Column()
  time: string

  @Column()
  price: number

  @Column('varchar', { length: 200 })
  description: string

  @Column()
  data_born: Date

  @Column()
  data_end: Date
}

export default Movies;