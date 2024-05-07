import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity'; 

@Entity('wishlist')
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    type: 'room' | 'flight' | 'vehicle';

    @Column({nullable:false})
    itemId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({nullable:false})
    userId: number;
}
