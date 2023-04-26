import { Injectable, Scope } from '@nestjs/common';

/**
 * In this way we can use the NestJS native and clean way to share request/session data after the middleware verified the authentication
 */
@Injectable({ scope: Scope.REQUEST })
export class UserSession {
  user: string;
}
