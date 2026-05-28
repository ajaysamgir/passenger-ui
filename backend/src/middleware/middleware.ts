import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    errors: ['Internal server error']
  });
}
