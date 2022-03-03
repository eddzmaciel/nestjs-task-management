import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

//Dependences
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

//Services
import { AuthService } from './services/auth.service';
//Controllers
import { AuthController } from './auth.controller';
//repositories
import { UsersRepository } from './repositories/users.repository';
import { JwtModule } from '@nestjs/jwt';

//JWT strategy
import { JwtStrategy } from './jwt.strategy';

@Module({
  //adding our repository into our module
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    //this exports a JWT service
    //here we are going to stablish the secret
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), //'topSecret51',
        // the token expiration time
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  //we are going to make available to the whole components who imports this auth module
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
