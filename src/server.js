import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { NftRouter } from './routes/nft.route.js';
import { connect } from './utils/connect.js';
import { apiLimiter } from './middlewares/ratelimit.js';
import { adminRouter } from './routes/admin.route.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 12 * 60 * 60 * 1000, // 12 hours
    },
  }),
);
app.use(cors());
app.set('trust proxy', 1);

// Route
app.use('/api/nft', apiLimiter, NftRouter);
app.use('/admin', adminRouter);

// 404 handle
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "This page doesn't exist",
  });
});

app.listen(port, async () => {
  console.log(`server is running on http://localhost:${port}`);
  await connect();
});
