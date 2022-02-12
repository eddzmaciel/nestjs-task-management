import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

//External dependences
import { ExtractJwt, Strategy } from 'passport-jwt';

//Repositories
import { UsersRepository } from './repositories/users.repository';

//Interfaces
import { JwtPayload } from './interfaces/jwt-payload.interface';

//Entities
import { User } from './entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration:false,
      //algoritms:'RS256'
    });
  }

  //we are doing this after we know that the token is valid
  //this is a promise because is a async method
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
