/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorMessage, TGeneralResponse } from '../interface/error';

const HelperDuplicateError = (err: any): TGeneralResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMsg = match && match[1];
  const errorMessage: TErrorMessage = [
    {
      path: err?.path,
      message: `${extractedMsg} already exists`,
    },
  ];
  const statusCode = 400;
  return {
    message: 'Duplicate Error',
    errorMessage,
    statusCode,
  };
};

export default HelperDuplicateError;
