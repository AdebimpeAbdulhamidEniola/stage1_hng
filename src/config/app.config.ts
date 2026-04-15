import cors from "cors";
import express, { Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { notFoundHandler } from "../utils/notfound.utils";
import { errorHandler } from "../utils/errorhandler.utils";

dotenv.config();

export const createApp = (): Application => {
  const app: Application = express();

  app.disable('x-powered-by') // Hide Express header for security

  app.use(express.json())

  // Use Morgan logger in development only
  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }


  app.use(cors({ origin: "*" }));


  //Routes
 



  //Not Found Handler
  app.use(notFoundHandler)

  //Error Handler 
  app.use(errorHandler)


  return app;
};