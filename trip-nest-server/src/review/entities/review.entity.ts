import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity('review')
export class review {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    hotelname: string;
    @Column()
    location: string;
   
    @Column({ unique: false })
    review: string;

    @Column({ unique: false })
    rating: string;
    
   
}

