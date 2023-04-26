import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify as jwtVerify } from 'jsonwebtoken';
import { UserSession } from '../user-session/user-session';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger: Logger = new Logger(AuthGuard.name);

  constructor(private readonly session: UserSession) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const httpArgs = context.switchToHttp();
    const req = httpArgs.getRequest();
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('No authorization provided');
    }
    try {
      const decoded = jwtVerify(token, process.env.JWT_SECRET ?? 'test');
      this.session.user = decoded.user;
    } catch (e) {
      this.logger.debug(e?.message ?? 'Could not verify JWT');
      throw new UnauthorizedException('Invalid JWT');
    }
    return true;
  }
}
