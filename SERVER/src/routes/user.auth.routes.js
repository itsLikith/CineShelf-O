import { Router } from 'express';
import {
  verifyMail,
  login,
  signup,
  logout,
} from '../controllers/user.auth.controller.js';
import {
  validateAccessToken,
  refreshAccessToken,
} from '../middlewares/auth.token.js';

const userauthroutes = Router();

userauthroutes.route('/verifyMail').post(verifyMail);
userauthroutes.route('/login').post(login);
userauthroutes.route('/signup').post(signup);
userauthroutes.route('/access-token').get(refreshAccessToken);
userauthroutes
  .route('/validate-token')
  .get(validateAccessToken, refreshAccessToken);
userauthroutes.route('/logout/:userID').get(validateAccessToken, logout);

export { userauthroutes };
