/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import HelperError from '../errors/HelperError';
import { TErrorMessage } from '../interface/error';
import HelperCastError from '../errors/HelperCastError';
import HelperDuplicateError from '../errors/HelperDuplicateError';
import config from '../config';
import HelperValidationError from '../errors/HelperValidationError';

const globarErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessage: TErrorMessage = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof HelperError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessage = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err?.name === 'CastError') {
    const convertedError = HelperCastError(err);
    statusCode = convertedError?.statusCode;
    message = convertedError?.message;
    errorMessage = convertedError?.errorMessage;
  } else if (err?.code === 11000) {
    const convertedError = HelperDuplicateError(err);
    statusCode = convertedError?.statusCode;
    message = convertedError?.message;
    errorMessage = convertedError?.errorMessage;
  } else if (err?.name === 'ValidationError') {
    const convertedError = HelperValidationError(err);
    statusCode = convertedError?.statusCode;
    message = convertedError?.message;
    errorMessage = convertedError?.errorMessage;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
    // err,
  });
};

export default globarErrorHandler;
