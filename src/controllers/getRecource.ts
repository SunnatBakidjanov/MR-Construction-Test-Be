import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

type Params = { id: string };

export const getRecource = async (req: Request<Params>, res: Response) => {
    const { id } = req.params;

    if (!id) {
        console.error('Id is required');
        return res.status(400).json({ message: 'Id is required' });
    }

    try {
        const resource = await prisma.resource.findUnique({ where: { id } });
        console.log('resource sent');

        return res.status(200).json({ resource });
    } catch (error) {
        const err = error as Error;
        console.error(err.message);

        return res.status(500).json({ message: 'Internal server error' });
    }
};
