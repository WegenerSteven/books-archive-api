import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { IsEmail, IsAlphanumeric, Length, Matches } from 'class-validator';
import { Profile } from 'src/modules/profiles/entities/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @IsAlphanumeric()
  @Length(2, 50)
  name: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 100 })
  @Length(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @Column()
  isActive: boolean;

  @OneToOne(() => Profile, (profile) => profile.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Relation<Profile>;
}
