import { Request, Response, NextFunction } from 'express';

const validateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, age } = req.body;

  if (typeof name !== 'string' || typeof email !== 'string' || typeof age !== 'number') {
    res.status(400).json({
      message: 'Invalid input',
      success: false
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      message: 'Invalid email format',
      success: false
    });
  }
  
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name) || name.length < 1) {
    res.status(400).json({
      message: 'Invalid name format',
      success: false
    });
  }

  next();
};


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
  validateUser,
  validatePagination
};