import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import memory from 'memorystore';
import errorHandle from './middlewares/404.js';
import NftRouter from './routes/nft.route.js';
import connect from './utils/connect.js';
import apiLimiter from './middlewares/ratelimit.js';
import adminRouter from './routes/admin.route.js';

const app = express();
const MemoryStore = memory(session);
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', 1);
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'SECRET',
        store: new MemoryStore({
            checkPeriod: 86400000,
        }),
        resave: false,
        saveUninitialized: true,
    }),
);
app.use(cors());

// Route
app.use('/api/nft', apiLimiter, NftRouter);
app.use('/api/admin', adminRouter);

// 404 handle
app.use(errorHandle);

// listen to server
app.listen(port, async () => {
    console.log(`server is running on http://localhost:${port}`);
    await connect();
});

export default app;
