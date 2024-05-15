import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction_history')
export class TransactionHistory {
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

  @Column()
  action: string;
}
