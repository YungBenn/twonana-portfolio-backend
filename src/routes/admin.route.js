import { Router } from 'express';
import * as sessionController from '../controllers/session.controller.js';

const adminRouter = Router();

adminRouter.post('/login', sessionController.createSession);
adminRouter.post('/register', sessionController.registerAdmin);
adminRouter.delete('/logout', sessionController.logoutSession);

export default adminRouter