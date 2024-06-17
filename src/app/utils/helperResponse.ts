import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  stausCode: number;
  message: string;
  data: T;
};

const HelperResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.stausCode).json({
    success: data?.success,
    statusCode: data?.stausCode,
    message: data?.message,
    data: data?.data,
  });
};

export default HelperResponse;
