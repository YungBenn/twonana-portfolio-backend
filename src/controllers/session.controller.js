import dotenv from 'dotenv';
dotenv.config();

export function isAuthenticated(req, res, next) {
  if (req.session.admin) {
    next();
  } else {
    res.status(401).json({
      message: 'Please login first!',
    });
  }
}

export function loginSession(req, res) {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (
    req.body.username !== adminUsername || req.body.password !== adminPassword) {
    res.json({
      message: 'wrong username or password',
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
