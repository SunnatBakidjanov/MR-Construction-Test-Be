import { Response, Request } from 'express';
import { prisma } from '../db/prisma';

type ReqBody = { name: string };

export const CreateResource = async (req: Request, res: Response) => {
    const { name } = req.body as ReqBody;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        await prisma.resource.create({ data: { name } });

        console.log('Resource created');
        return res.status(201).json({ message: 'Resource created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
