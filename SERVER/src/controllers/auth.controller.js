import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import argon2 from 'argon2';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../middlewares/auth.token.js';

const verifyMail = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return ApiResponse.error('Email is required', null, 400).send(res);
  try {
    const user = await User.findOne({ email });
    if (!user) return ApiResponse.error('User not found', null, 404).send(res);
    return ApiResponse.success('Email exists, user found', null, 200).send(res);
  } catch (error) {
    console.error(error);
    return ApiResponse.error('Internal server error', null, 500).send(res);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return ApiResponse.error('Email and password are required', null, 400).send(
      res,
    );
  try {
    const user = await User.findOne({ email });
    if (!user)
      return ApiResponse.error('User does not exist', null, 404).send(res);
    const hashedPassword = user.password;
    if (!(await argon2.verify(hashedPassword, password)))
      return ApiResponse.error('Invalid credentials', null, 401).send(res);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie('CineShelfAccessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.cookie('CineShelfRefreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return ApiResponse.success(
      'Login successfull',
      { 'Access Token': accessToken, 'Refresh Token': refreshToken },
      200,
    ).send(res);
  } catch (error) {
    console.error(error);
    return ApiResponse.error('Internal server error', null, 500).send(res);
  }
};

const signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword)
    return ApiResponse.error(
      'Email, password and confirm password fields are required',
      null,
      400,
    ).send(res);
  const user = await User.findOne({ email });
  if (user)
    return ApiResponse.error('User already exists', null, 403).send(res);
  if (password !== confirmPassword)
    return ApiResponse.error('Passwords must match', null, 400).send(res);
  try {
    const hashedPassword = await argon2.hash(password);
    const user = new User({
      email,
      password: hashedPassword,
    });
    await user.save();
    return ApiResponse.success('User registered successfully', email, 200).send(
      res,
    );
  } catch (error) {
    console.error(error);
    return ApiResponse.error('Internal server error', null, 500).send(res);
  }
};

const logout = async (req, res) => {
  const { userID } = req.params;
  try {
    await User.findByIdAndUpdate(
      userID,
      {
        $set: {
          refreshToken: null,
        },
      },
      {
        new: true,
      },
    );
    res.clearCookie('CineShelfAccessToken');
    res.clearCookie('CineShelfRefreshToken');
    return ApiResponse.success('User successfully logged out',null,200).send(res);
  } catch (error) {
    console.error(error);
    return ApiResponse.error('Internal server error', null, 500).send(res);
  }
};

export { 
  verifyMail, 
  login, 
  signup, 
  logout 
};
