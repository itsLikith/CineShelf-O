import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'creator'],
      default: 'user',
    },
    profilePic: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    liked: {
      type: [Object],
      default: null,
    },
    history: {
      type: [Object],
      default: null,
    },
    watchlater: {
      type: [Object],
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);
export { User };
