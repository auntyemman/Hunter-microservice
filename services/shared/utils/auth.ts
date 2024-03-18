import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authenticateAndAuthorize(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403); // Forbidden

        // Authorization logic
        if (user.role !== 'admin') {
            return res.status(403).send('Unauthorized');
        }

        req.user = user;
        next();
    });
}