import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from './users.interface';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private readonly clientRMQ: ClientRMQ) {
  }

  create(createUserDto: CreateUserDto) {
    return this.clientRMQ.send('createUser', createUserDto);
  }

  findAll() {
    return this.clientRMQ.send('findAllUsers', {});
  }

  findOne(id: number) {
    return this.clientRMQ.send('findOneUser', { id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.clientRMQ.send('updateUser', { id, ...updateUserDto });
  }

  remove(id: number) {
    return this.clientRMQ.send('removeUser', { id });
  }
}
