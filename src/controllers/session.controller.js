import { adminModel } from '../models/admin.model.js';
import { checkPassword, hashing } from '../utils/hashing.js';
import { findAdminByUsername } from '../services/admin.service.js';
import { logger } from '../utils/logger.js';

export function isAuthenticated(req, res, next) {
  if (req.session.admin) {
    next();
  } else {
    logger.error('Please login first!');
    res.status(401).json({
      message: 'Please login first!',
    });
  }
}

export async function registerAdmin(req, res) {
  req.body.admin_id = crypto.randomUUID();
  try {
    const admin = await findAdminByUsername(req.body.username);
    if (admin) {
      logger.error('Username is already exist!');
      res.status(422).json({
        message: 'Username is already exist!',
      });
    } else {
      req.body.password = hashing(req.body.password);
      await adminModel.create(req.body);
      logger.info('new admin created');
      res.status(201).json({
        message: 'Success register admin',
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(422).json({
      message: 'Failed to register',
    });
  }
}

export async function createSession(req, res) {
  try {
    const admin = await findAdminByUsername(req.body.username);
    const isValid = checkPassword(req.body.password, admin.password);
    if (!isValid) {
      logger.error('Invalid username or password');
      res.status(404).json({
        message: 'Invalid username or password',
      });
    } else {
      req.session.regenerate((err) => {
        if (err) {
          logger.error(err);
        }
        req.session.admin = req.body.username;
        req.session.save((err) => {
          if (err) {
            logger.error(err);
          }
          logger.info('Login success');
          res.json({
            message: 'login success',
          });
        });
      });
    }
  } catch (error) {
    logger.error('Invalid username or password');
    res.status(422).json({
      message: 'Invalid username or password',
    });
  }
}

export async function logoutSession(req, res) {
  req.session.admin = null;
  req.session.save((err) => {
    if (err) {
      logger.error(err);
    }
    logger.info('Logout success');
    res.json({
      message: 'logout success',
    });
  });
}
