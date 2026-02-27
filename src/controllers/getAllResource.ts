import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

export const getAllResources = async (_req: Request, res: Response) => {
    try {
        const resources = await prisma.resource.findMany();

        console.log('All resources sent');
        return res.status(200).json({ resources });
    } catch (error) {
        console.error(error);

        return res.status(500).json({ message: 'Internal server error' });
    }
};
