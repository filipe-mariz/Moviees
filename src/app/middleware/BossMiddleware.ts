import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayLoad {
    id: number,
    iat: number,
    exp: number,    
}

export default function bossMiddleware (
    request: Request, response: Response, next: NextFunction
){
    const authorization = request.headers.authorization;
    
    if (!authorization) {
        return response.status(401).json({ message: "User is not valid" })
    }

    const token = authorization.split(' ')[1];
    try {
        const data = jwt.verify(token, process.env.TOKEN_DELETE)
        console.log(data);

        const { id } = data as TokenPayLoad;
        request.body = id;

        return next();

    } catch(err) {
        return response.status(401).json({ message: "User is not" })
    }
}
