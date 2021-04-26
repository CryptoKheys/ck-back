import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash, createHmac } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  tgInfos = {
    auth_date: 1619348708,
    first_name: 'Mathieu',
    hash: '56aacbf15b0e45f77a39ea9767a6aad05dd95778d27d5dd00ca808fc5156eb56',
    id: '763028758',
    photo_url:
      'https://t.me/i/userpic/320/dmxc5mixpR9isvmDJnVOKzwJqBbYkw90fjDpWNcNFkU.jpg',
    username: 'MathieuN7',
  };

  async validateUser(tgInfos): Promise<any> {
    {
      const { hash, ...userData } = tgInfos;

      const data_check_string = Object.keys(userData)
        .sort()
        .map((key) => `${key}=${userData[key]}`)
        .join('\n');

      const secret_key = createHash('sha256')
        .update(process.env.BOT_TOKEN)
        .digest();

      const hmac = createHmac('sha256', secret_key)
        .update(data_check_string)
        .digest('hex');

      if (hash === hmac) {
        console.log('OK, user authentifié', userData);
        return userData;
      } else {
        console.log('WRONG ! Problème capitaine');
        return false;
      }
    }
  }

  async login(user: any) {
    const payload = await this.validateUser(user);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  extractFromJwt(token: string) {
    return this.jwtService.decode(token);
  }
}
