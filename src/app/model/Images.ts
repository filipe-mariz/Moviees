import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Movies from './Movies';
@Entity('Images')
class Images {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  path: string;

  @ManyToOne(() => Movies, movies => movies.images)
  @JoinColumn({ name: 'movies_id' })
  movies: Movies
  
}

export default Images;
