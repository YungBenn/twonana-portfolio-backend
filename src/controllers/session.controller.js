import dotenv from 'dotenv';
dotenv.config();
import { adminModel } from '../models/admin.model.js';
import { checkPassword, hashing } from '../utils/hashing.js';
import { findAdminByUsername } from '../services/admin.service.js';

export function isAuthenticated(req, res, next) {
  if (req.session.admin) {
    next();
  } else {
    console.error('Please login first!');
    res.status(401).json({
      message: 'Please login first!',
    });
  }
}

export async function registerAdmin(req, res) {
  req.body.admin_id = crypto.randomUUID();
  try {
    req.body.password = hashing(req.body.password);
    await adminModel.create(req.body);
    console.log('new admin created');
    res.status(201).json({
      message: 'Success register admin',
    });
  } catch (error) {
    console.error(error);
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
      console.error('Invalid username or password');
      res.status(404).json({
        message: 'Invalid username or password',
      });
    } else {
      req.session.regenerate((err) => {
        if (err) {
          console.error(err);
        }
        req.session.admin = req.body.username;
        req.session.save((err) => {
          if (err) {
            console.error(err);
          }
          console.log('Login success');
          res.json({
            message: 'login success',
          });
        });
      });
    }
  } catch (error) {
    console.error('Invalid username or password');
    res.status(422).json({
      message: 'Invalid username or password',
    });
  }
}

export async function logoutSession(req, res) {
  req.session.admin = null;
  req.session.save((err) => {
    if (err) {
      console.error(err);
    }
    console.log('Logout success');
    res.json({
      message: 'logout success',
    });
  });
}
