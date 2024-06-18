import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllBikesFromDB = async () => {
  const result = await Bike.find();
  return result;
};

const updateBikeIntoDB = async (payload: Partial<TBike>, id: string) => {
  // only "perHourField" can be updated
  // const payloadFields = Object.keys(payload);
  // const payloadLength = payloadFields.length;

  // if (payloadLength > 1) {
  //   throw new Error('only pricePerHour Field can be updated');
  // }
  const result = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteBikeFromDB = async (id: string) => {
  const result = await Bike.findByIdAndDelete(id);
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
