import { Response } from 'express';

const helperNoDataFound = (res: Response) => {
  return res.status(404).json({
    success: false,
    message: 'No Data Found',
    data: [],
  });
};

export default helperNoDataFound;
