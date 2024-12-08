import { Router } from 'express';

const adminauthroutes = Router();

adminauthroutes.route('/login').post();

export { adminauthroutes };
