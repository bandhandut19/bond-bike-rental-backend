import { model, Schema } from 'mongoose';
import { BikeModel, TBike } from './bike.interface';

const bikeSchema = new Schema<TBike, BikeModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    cc: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
bikeSchema.statics.isBikeExists = async function (id: string) {
  return await Bike.findById(id);
};

export const Bike = model<TBike, BikeModel>('bike', bikeSchema);
