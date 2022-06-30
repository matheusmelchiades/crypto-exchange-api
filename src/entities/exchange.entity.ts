import { ExchangeType, IExchange } from '../interfaces/exchange.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exchange implements IExchange {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column()
  currencyFrom: string;

  @Column({ type: 'bigint' })
  amountFrom: number;

  @Column()
  currencyTo: string;

  @Column({ type: 'bigint' })
  amountTo: number;

  @Column({ default: 'default' })
  type: ExchangeType;
}
