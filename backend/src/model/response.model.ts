import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty()
  msg: string;

  @ApiProperty()
  data: T;

  @ApiProperty()
  code: number;
}
