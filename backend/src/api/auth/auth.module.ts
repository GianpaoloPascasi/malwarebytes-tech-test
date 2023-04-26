import { Module } from '@nestjs/common';
import { UserSession } from './user-session/user-session';

@Module({
  providers: [UserSession],
  exports: [UserSession],
})
export class AuthModule {}
