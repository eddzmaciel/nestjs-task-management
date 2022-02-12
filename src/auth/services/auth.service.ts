import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

//Repositories
import { UsersRepository } from '../repositories/users.repository';

//DTOs
import { AuthCredencialsDto } from '../dto/auth-credentials.dto';

//Services
import { JwtService } from '@nestjs/jwt';

//Interfaces (format for the objectData in the app)
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    //we need to inject the repository as well
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredencialsDto: AuthCredencialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredencialsDto);
  }

  async signIn(
    authCredencialsDto: AuthCredencialsDto,
    //here you can define the returning type in this way
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredencialsDto;
    const user = await this.usersRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      // if, it means that user exist and password is correct
      const payload: JwtPayload = { username };
      //Generate a access token with the username
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please chek your login credentials');
    }
  }
}
