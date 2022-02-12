import { EntityRepository, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

//Entities
import { User } from '../entities/user.entity';

//Dto,it is like a dataobject format for specific case
import { AuthCredencialsDto } from '../dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredencialsDto: AuthCredencialsDto): Promise<void> {
    const { username, password } = authCredencialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      console.log('-->EntityRepositoryError: ', error.code);
      // 23505 - duplicate records in postgres
      if (error.code === '23505') {
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
