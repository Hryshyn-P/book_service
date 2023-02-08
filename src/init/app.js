import cors from "cors";
import 'dotenv/config';
import express, { json } from "express";
import passport from "passport";
import { globalErrorHandler, wrongEndpointHandler } from '../middlewares/errHandler.js';
import logger from "../middlewares/logger.js";
import limiter from "../middlewares/rateLimiter.js";
import { default as bookRouter } from '../routes/book.js';
import { default as userRouter } from '../routes/user.js';
import initDb from './db.js';


export default function init () {
    // Express
    const port = process.env.PORT || 3001;
    const app = express();
    app.use(limiter);
    app.use(logger);
    app.use(json());
    app.use(cors());
    app.use(passport.initialize());
    app.use(userRouter);
    app.use(bookRouter);
    app.use(wrongEndpointHandler);
    app.use(globalErrorHandler);
    // Mongoose
    initDb()
        .then(() => {
            app.listen(port, () => {
                console.log(`Server running. Use our API on port: ${port}`);
            });
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB: ", error);
        });
    return app;
    }

    // JOI
    export const joiOptions = {
        abortEarly: false, // stop validation on first error
        allowUnknown: false, // allow unknown keys in the input data
        stripUnknown: true, // remove unknown keys from the input data
    };