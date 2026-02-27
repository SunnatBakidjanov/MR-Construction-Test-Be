import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

type Params = { id: string };

export const getAllResourceBookings = async (req: Request<Params>, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Id is required' });
    }

    try {
        await prisma.booking.updateMany({
            where: {
                status: { not: 'Cancelled' },
                endTime: { lt: new Date() },
            },
            data: {
                status: 'Expired',
            },
        });

        const bookings = await prisma.booking.findMany({
            where: { resourceId: id },
            orderBy: { startTime: 'asc' },
        });

        return res.status(200).json({ bookings });
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: 'Internal server error' });
    }
};
