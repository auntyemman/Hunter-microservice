import { Request, Response } from 'express';
import axios from 'axios';

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const response = await axios.get(`http://user-service/api/users/${userId}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response.status).json({ error: error.response.data });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const response = await axios.put(`http://user-service/api/users/${userId}`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response.status).json({ error: error.response.data });
    }
};