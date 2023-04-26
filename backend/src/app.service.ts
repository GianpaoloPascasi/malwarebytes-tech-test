import { Injectable } from '@nestjs/common';
import { ApiResponse } from './model/response.model';

@Injectable()
export class AppService {
  getStatus(): ApiResponse<Array<{ serviceName: string; status: boolean }>> {
    return {
      code: 200,
      msg: 'Service is ok',
      data: [
        {
          serviceName: 'Messenger',
          status: true,
        },
      ],
    };
  }
}
