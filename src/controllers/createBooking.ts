import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

type Params = { id: string };
type ReqBody = { startTime: string; endTime: string };
export const createBooking = async (req: Request<Params>, res: Response) => {
    const { id } = req.params;
    const { startTime, endTime } = req.body as ReqBody;

    if (!id) {
        return res.status(400).json({ message: 'Id is required' });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start > end) {
        return res.status(400).json({ message: 'Start time must be before end time' });
    }

    if (start < new Date()) {
        console.log('id is required');

        return res.status(400).json({ message: 'Start time must be in the future' });
    }

    try {
        const overlap = await prisma.booking.findFirst({
            where: {
                resourceId: id,
                startTime: { lt: end },
                endTime: { gt: start },
                NOT: {
                    status: 'Cancelled',
                },
            },
        });

        if (overlap) {
            console.error('Booking overlaps');
            return res.status(409).json({ message: 'Booking overlaps' });
        }
        const booking = await prisma.booking.create({
            data: {
                resourceId: id,
                status: 'Created',
                startTime: start,
                endTime: end,
            },
        });

        console.log('booking created');
        return res.status(201).json({ booking });
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
};
