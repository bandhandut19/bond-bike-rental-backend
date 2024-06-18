import mongoose from 'mongoose';
import { TErrorMessage, TGeneralResponse } from '../interface/error';

const HelperCastError = (err: mongoose.Error.CastError): TGeneralResponse => {
  const statusCode = 400;
  const errorMessage: TErrorMessage = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage,
  };
};

export default HelperCastError;
