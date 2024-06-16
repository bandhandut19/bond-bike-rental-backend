import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'
import { UserRoles } from './user.constant'

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<TUser>('user', userSchema)
