import { 
  Column, 
  Entity, 
  JoinColumn, 
  OneToMany, 
  PrimaryGeneratedColumn 
} from "typeorm";
import Images from './Images';

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

  @OneToMany(() => Images, image => image.movies, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'movies_id'})
  images: Images
}

export default Movies;