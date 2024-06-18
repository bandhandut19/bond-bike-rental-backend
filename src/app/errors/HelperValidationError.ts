import mongoose from 'mongoose';
import { TErrorMessage, TGeneralResponse } from '../interface/error';

const HelperValidationError = (
  err: mongoose.Error.ValidationError,
): TGeneralResponse => {
  const errorMessage: TErrorMessage = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
  };
};

export default HelperValidationError;
