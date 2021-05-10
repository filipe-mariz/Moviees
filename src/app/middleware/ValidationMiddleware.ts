import { Request, Response, NextFunction } from 'express';

export default function validationMiddleware(
  request: Request, response: Response, next: NextFunction
) {
  const validation = request.headers.accept;
  const accept = process.env.VALIDATION;
  if(validation != accept) {
    return response.status(400).json({
      message: "You don't have a auth"
    })
  } else {
    return next();
  }
}
