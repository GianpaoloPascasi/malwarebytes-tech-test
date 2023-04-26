import { ApiProperty } from '@nestjs/swagger';

export class UserApiBody {
  @ApiProperty()
  user: string;

  @ApiProperty()
  password: string;
}
