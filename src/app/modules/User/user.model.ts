import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import { UserRoles } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
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
);

// userSchema.statics.isEmailExists = async function (email: string) {
//   return await User.findOne({ email });
// };

userSchema.statics.encryptPassword = async function (plainPassword: string) {
  return await bcrypt.hash(plainPassword, Number(config.salt));
};
userSchema.pre('save', async function () {
  this.password = await User.encryptPassword(this.password);
});
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isValidPassword = async function (
  plainPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// userSchema.pre('findOneAndUpdate', async function (next) {
//   const result = this;
//   console.log(this._update);
// });

export const User = model<TUser, UserModel>('user', userSchema);
