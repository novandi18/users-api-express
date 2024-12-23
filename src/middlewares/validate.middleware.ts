import { Request, Response, NextFunction } from 'express';

const validatePagination = (req: Request, res: Response, next: NextFunction): void => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  if (page <= 0 || limit <= 0 || isNaN(page) || isNaN(limit)) {
    res.status(400).json({
      message: 'Invalid pagination parameters. Both `page` and `limit` should be numbers greater than 0.',
      success: false
    });
  }

  next();
};

export {
  validatePagination
};