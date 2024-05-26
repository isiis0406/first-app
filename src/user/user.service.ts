import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  getUsersHandler(): Promise<User[]> {
    return this.userRepository.find();
  }
  getUserHandler(userId: number) {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  createUserHandler(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }
  updateUserHandler(userId: number, updateUserDto: UpdateUserDto) {
    // Return the updated user
    return this.userRepository.save({ id: userId, ...updateUserDto });
  }
  deleteUserHandler(userId: number) {
    return this.userRepository.delete(userId);
  }
}
