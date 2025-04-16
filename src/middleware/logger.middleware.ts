import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`methods ${req.method}, path: ${req.url}`);
  next();
};

export default requestLogger;
