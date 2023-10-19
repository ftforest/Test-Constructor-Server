import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({where: {id}});
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log(email,"email");
    let user = this.usersRepository.findOneBy({
      email: email,
    });
    console.log(user,"user");
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

}