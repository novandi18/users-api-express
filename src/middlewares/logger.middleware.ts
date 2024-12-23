import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const logStream = fs.createWriteStream(path.join(__dirname, '../../request.log'), { flags: 'a' });

const logger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] ${method} ${url} ${res.statusCode} - ${duration}ms\n`;
    logStream.write(log);
  });

  next();
};

export default logger;