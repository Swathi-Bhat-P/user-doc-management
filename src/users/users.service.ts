import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async create(user: Partial<User>) {
    const newUser = this.usersRepo.create(user);
    return this.usersRepo.save(newUser);
  }

  async updateRole(id: number, role: string) {
    const user = await this.usersRepo.findOneBy({ id });
    if (user) {
      user.role = role as any;
      return this.usersRepo.save(user);
    }
    return null;
  }

  async remove(id: number) {
    return this.usersRepo.delete(id);
  }
}
