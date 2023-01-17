import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new Schema(
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
    },
    isBlocked: {
      type: Boolean,
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (
  name: string,
  email: string,
  password: string,
  isBlocked: boolean = false,
  isChecked: boolean = false
) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email si not valid');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email is already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    isBlocked,
    isChecked,
  });

  return user;
};

module.exports = model('User', userSchema);
