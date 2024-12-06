import { Router } from 'express';
import { verifyMail, login, signup, logout } from '../controllers/auth.controller.js';
import {
  validateAccessToken,
  refreshAccessToken,
} from '../middlewares/auth.token.js';

const authroutes = Router();

authroutes.route('/verifyMail').post(verifyMail);
authroutes.route('/login').post(login);
authroutes.route('/signup').post(signup);
authroutes.route('/access-token').get(refreshAccessToken);
authroutes.route('/validate-token').get(validateAccessToken);
authroutes.route('/logout/:userID').get(validateAccessToken,logout);

export { authroutes };
