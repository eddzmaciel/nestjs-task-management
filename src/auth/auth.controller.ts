import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
//External dependences
//import { AuthGuard } from '@nestjs/passport';
//DTOs
import { AuthCredencialsDto } from './dto/auth-credentials.dto';
//services
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredencialsDto: AuthCredencialsDto): Promise<void> {
    return this.authService.signUp(authCredencialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredencialsDto: AuthCredencialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredencialsDto);
  }

  // @Post('/test')
  // //using the authorization
  // @UseGuards(AuthGuard())
  // test(@Req() req) {
  //   console.log('--->request: ', req);
  // }
}
