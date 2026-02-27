import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

type Params = {
    id: string;
};

type Body = { status: 'Created' | 'Confirmed' | 'Expired' | 'Cancelled' };

export const updateBookingStatus = async (req: Request<Params, {}, Body>, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
        return res.status(400).json({
            message: 'Id and status required',
        });
    }

    try {
        const booking = await prisma.booking.update({
            where: { id },
            data: { status },
        });

        console.log('Booking status updated');

        return res.status(200).json({ booking });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to update booking',
        });
    }
};
