import { ZodError } from 'zod';
import { TErrorMessage, TGeneralResponse } from '../interface/error';

const HelperZodError = (err: ZodError): TGeneralResponse => {
  const statusCode = 400;
  const errorMessage: TErrorMessage = err?.issues.map((issue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
  };
};

export default HelperZodError;
