import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction_history')
export class DepositMoney {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  method: string;

  @Column()
  trxId: string;

  // @Column({ default: 'Credited' })
  // action: string;

  @Column()
  action: string = 'Credited';
}
