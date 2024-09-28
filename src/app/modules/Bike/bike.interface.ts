import { Model, Types } from 'mongoose';

export type TBike = {
  _id?: Types.ObjectId;
  name: string;
  image: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
};
export interface BikeModel extends Model<TBike> {
  isBikeExists(id: Types.ObjectId): Promise<TBike>;
}
