import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
  const payload = {
    id: user._id,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFESPAN,
  });
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user._id,
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFESPAN,
  });
};

const validateAccessToken = (req, res, next) => {
  const token = req.cookies.CineShelfAccessToken;
  if (!token)
    return ApiResponse.error('Access token required', null, 401).send(res);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return ApiResponse.error('Invalid access token', null, 403).send(res);
    req.user = decoded;
    next();
  });
};

const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.CineShelfRefreshToken;
  if (!refreshToken)
    ApiResponse.error('Refresh token required', null, 401).send(res);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return ApiResponse.error('Refresh token invalid', null, 403).send(res);
    const newAccessToken = generateAccessToken({ _id: decoded.id });
    res.cookie('CineShelfAccessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return ApiResponse.success(
      'Access token generated',
      { 'Access token': newAccessToken },
      200,
    ).send(res);
  });
};

export {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
  refreshAccessToken,
};
